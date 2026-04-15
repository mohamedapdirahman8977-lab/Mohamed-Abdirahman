import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Upload, X, Plus, Trash2, Loader2 } from 'lucide-react';
import { db, storage, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { onAuthStateChanged, User } from 'firebase/auth';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  createdAt: any;
}

export default function PortfolioManager() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const userDoc = await getDoc(doc(db, 'users', u.uid));
        setIsAdmin(userDoc.data()?.role === 'admin' || u.email === 'maxamedcraxman12345@gmail.com');
      } else {
        setIsAdmin(false);
      }
    });

    const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
    const unsubscribePortfolio = onSnapshot(q, (snapshot) => {
      const portfolioData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PortfolioItem[];
      setItems(portfolioData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'portfolio');
    });

    return () => {
      unsubscribeAuth();
      unsubscribePortfolio();
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !category) return;

    setUploading(true);
    setSuccess(false);
    try {
      const storageRef = ref(storage, `portfolio/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'portfolio'), {
        title,
        category,
        description,
        image: downloadURL,
        createdAt: serverTimestamp(),
      });

      setTitle('');
      setCategory('');
      setDescription('');
      setFile(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'portfolio');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await deleteDoc(doc(db, 'portfolio', id));
      // Optionally delete from storage too
      // const imageRef = ref(storage, imageUrl);
      // await deleteObject(imageRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'portfolio');
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="bg-card-bg border border-border rounded-2xl p-8 mb-12">
      <div className="flex items-center gap-3 mb-8">
        <Plus className="text-accent-primary w-6 h-6" />
        <h2 className="text-2xl font-bold text-text-main">Manage Portfolio</h2>
      </div>

      <form onSubmit={handleUpload} className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-text-dim uppercase tracking-widest mb-2">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-main focus:border-accent-primary outline-none transition-colors"
              placeholder="e.g. AI Brand Identity"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-dim uppercase tracking-widest mb-2">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-main focus:border-accent-primary outline-none transition-colors"
              placeholder="e.g. Social Media"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-dim uppercase tracking-widest mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-main focus:border-accent-primary outline-none transition-colors h-32 resize-none"
              placeholder="Tell us about the project..."
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-bold text-text-dim uppercase tracking-widest mb-2">Project Image</label>
          <div className="relative aspect-video rounded-xl border-2 border-dashed border-border hover:border-accent-primary transition-colors flex flex-col items-center justify-center gap-4 bg-bg overflow-hidden group">
            {file ? (
              <>
                <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => setFile(null)}
                  className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-text-dim" />
                <p className="text-xs text-text-dim">Click to upload or drag and drop</p>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  required
                />
              </>
            )}
          </div>
          <button
            type="submit"
            disabled={uploading || !file}
            className="w-full py-4 rounded-lg bg-gradient-accent text-white font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add to Portfolio
              </>
            )}
          </button>
          {success && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-green-500 text-sm font-bold"
            >
              Project added successfully!
            </motion.p>
          )}
        </div>
      </form>

      <div className="border-t border-border pt-8">
        <h3 className="text-lg font-bold text-text-main mb-6">Current Items</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative aspect-square rounded-lg overflow-hidden border border-border">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                <p className="text-[10px] font-bold text-white mb-1 truncate w-full">{item.title}</p>
                <button 
                  onClick={() => handleDelete(item.id, item.image)}
                  className="p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
