import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Shield, Sparkles, Image, PackagePlus, Edit2, Trash2, Check, RefreshCw, KeyRound, Save, Eye, EyeOff, AlertCircle, Database, Flame, LogIn, LogOut, CheckCircle2 } from 'lucide-react';
import { ProductItem, BannerConfig, BusinessLocation } from '../types';
import { FIREBASE_APP_CONFIG, testFirebaseConnection, getOrdersForAdmin, getInquiriesForAdmin, signInWithGoogle, logOutUser, subscribeToAuth, StoredOrder, StoredInquiry } from '../lib/firebase';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  bannerConfig: BannerConfig;
  currentLocation: BusinessLocation;
  adminPasswordHash: string; // The saved passkey
  onUpdateBanner: (newBanner: BannerConfig) => void;
  onUpdateProducts: (newProducts: ProductItem[]) => void;
  onUpdateLocation: (newLocation: BusinessLocation) => void;
  onChangeAdminPassword: (newPass: string) => void;
  onResetDefaults: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  products,
  bannerConfig,
  currentLocation,
  adminPasswordHash,
  onUpdateBanner,
  onUpdateProducts,
  onUpdateLocation,
  onChangeAdminPassword,
  onResetDefaults
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'banner' | 'products' | 'store' | 'security' | 'firebase'>('banner');

  // Firebase integration states
  const [firebaseStatus, setFirebaseStatus] = useState<{ testing: boolean; message: string; success: boolean | null }>({
    testing: false,
    message: `Firebase Config Active: ${FIREBASE_APP_CONFIG.projectId}`,
    success: true
  });
  const [authUser, setAuthUser] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<StoredOrder[]>([]);
  const [recentInquiries, setRecentInquiries] = useState<StoredInquiry[]>([]);
  const [isLoadingFirebaseData, setIsLoadingFirebaseData] = useState<boolean>(false);

  // Local draft states
  const [bannerDraft, setBannerDraft] = useState<BannerConfig>(bannerConfig);
  const [locationDraft, setLocationDraft] = useState<BusinessLocation>(currentLocation);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [isAddingNewProduct, setIsAddingNewProduct] = useState<boolean>(false);

  // New product form (Bangladeshi organic defaults with ৳ Tk)
  const [newProd, setNewProd] = useState<Partial<ProductItem>>({
    name: '',
    slug: '',
    category: 'vegetables',
    categoryLabel: 'Organic Shobji & Shak',
    price: 60,
    unit: 'প্রতি আঁটি / কেজি (per bunch/kg)',
    farmOrigin: 'Narsingdi Model Organic Farm',
    distanceMiles: 25,
    harvested: 'Aj Shokale Tola (Today Morning)',
    certified: '100% Formalin & Pesticide Free Organic',
    description: '',
    nutrients: ['Antioxidants', 'Vitamins', 'Iron'],
    inStock: true,
    bgGradient: 'from-emerald-950/15 via-teal-950/5 to-transparent',
    accentColor: '#059669'
  });

  // Password change state
  const [currentPasswordCheck, setCurrentPasswordCheck] = useState<string>('');
  const [newPasswordValue, setNewPasswordValue] = useState<string>('');
  const [passwordSuccess, setPasswordSuccess] = useState<string>('');
  const [passwordChangeError, setPasswordChangeError] = useState<string>('');

  const [notification, setNotification] = useState<string>('');

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  useEffect(() => {
    const unsub = subscribeToAuth((user) => {
      setAuthUser(user);
    });
    return () => unsub();
  }, []);

  const refreshFirebaseData = async () => {
    setIsLoadingFirebaseData(true);
    const [orders, inqs] = await Promise.all([
      getOrdersForAdmin(),
      getInquiriesForAdmin()
    ]);
    setRecentOrders(orders);
    setRecentInquiries(inqs);
    setIsLoadingFirebaseData(false);
  };

  useEffect(() => {
    if (isAuthenticated && activeTab === 'firebase') {
      refreshFirebaseData();
    }
  }, [isAuthenticated, activeTab]);

  const handleTestConnection = async () => {
    setFirebaseStatus({ testing: true, message: 'Connecting to Firebase server...', success: null });
    const result = await testFirebaseConnection();
    setFirebaseStatus({ testing: false, message: result.message, success: result.success });
  };

  const handleGoogleSignIn = async () => {
    const res = await signInWithGoogle();
    if (res.success) {
      showNotification(`Firebase Auth Login Successful: ${res.user?.email || 'Admin'}`);
      refreshFirebaseData();
    } else {
      showNotification(`Google Sign-in Note: ${res.error}`);
    }
  };

  const handleGoogleSignOut = async () => {
    await logOutUser();
    showNotification('Firebase Auth logged out.');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === adminPasswordHash) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('ভুল এডমিন পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন (Incorrect Admin Password).');
    }
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBanner(bannerDraft);
    showNotification('ব্যানার ও ব্যানার অফার সফলভাবে আপডেট হয়েছে! (Banner updated successfully)');
  };

  const handleSaveStore = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateLocation(locationDraft);
    showNotification('দোকানের তথ্য ও ঠিকানা আপডেট করা হয়েছে! (Store info saved)');
  };

  const handleAddNewProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) return;

    const slug = newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const productToAdd: ProductItem = {
      id: `prod-${Date.now()}`,
      name: newProd.name,
      slug: slug || 'organic-item',
      category: (newProd.category as any) || 'vegetables',
      categoryLabel: newProd.category === 'fruits' ? 'Seasonal Fol (ফলমূল)' : newProd.category === 'pantry' ? 'Khaati Pantry & Tel (তেল ও মধু)' : 'Organic Shobji (শাকসবজি)',
      price: Number(newProd.price),
      unit: newProd.unit || 'প্রতি কেজি (per kg)',
      farmOrigin: newProd.farmOrigin || `${currentLocation.city} Organic Farm`,
      distanceMiles: newProd.distanceMiles || 20,
      harvested: newProd.harvested || 'Fresh Daily Harvest',
      certified: newProd.certified || '100% Certified Organic',
      description: newProd.description || 'Farm-fresh organic produce grown without artificial sprays or chemicals.',
      nutrients: newProd.nutrients && newProd.nutrients.length > 0 ? newProd.nutrients : ['Vitamin A', 'Natural Minerals'],
      inStock: true,
      bgGradient: 'from-emerald-950/15 via-teal-950/5 to-transparent',
      accentColor: '#059669'
    };

    onUpdateProducts([productToAdd, ...products]);
    setIsAddingNewProduct(false);
    setNewProd({
      name: '',
      slug: '',
      category: 'vegetables',
      categoryLabel: 'Organic Shobji & Shak',
      price: 60,
      unit: 'প্রতি কেজি',
      farmOrigin: 'Narsingdi Model Organic Farm',
      distanceMiles: 25,
      harvested: 'Aj shokale tola',
      certified: '100% Chemical-Free Organic',
      description: '',
      nutrients: ['Antioxidants', 'Vitamins'],
      inStock: true,
      bgGradient: 'from-emerald-950/15 via-teal-950/5 to-transparent',
      accentColor: '#059669'
    });
    showNotification(`নতুন পণ্য "${productToAdd.name}" সফলভাবে যুক্ত হয়েছে!`);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('আপনি কি এই পণ্যটি মুছে ফেলতে চান? (Delete this product?)')) {
      const updated = products.filter(p => p.id !== id);
      onUpdateProducts(updated);
      showNotification('পণ্যটি সফলভাবে মুছে ফেলা হয়েছে (Product deleted)');
    }
  };

  const handleSaveProductEdit = (updatedItem: ProductItem) => {
    const updated = products.map(p => p.id === updatedItem.id ? updatedItem : p);
    onUpdateProducts(updated);
    setEditingProductId(null);
    showNotification(`"${updatedItem.name}" এর তথ্য আপডেট করা হয়েছে!`);
  };

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeError('');
    setPasswordSuccess('');

    if (currentPasswordCheck !== adminPasswordHash) {
      setPasswordChangeError('বর্তমান পাসওয়ার্ডটি সঠিক নয় (Current password is incorrect).');
      return;
    }

    if (newPasswordValue.length < 4) {
      setPasswordChangeError('নতুন পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে (Minimum 4 characters).');
      return;
    }

    onChangeAdminPassword(newPasswordValue);
    setPasswordSuccess('এডমিন পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে! (Password changed successfully)');
    setCurrentPasswordCheck('');
    setNewPasswordValue('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-display text-white">Organic Food Admin Portal (মালিকের প্যানেল)</h2>
                <span className="text-[10px] bg-emerald-900 text-emerald-200 px-2 py-0.5 rounded font-mono">
                  {isAuthenticated ? 'UNLOCKED' : 'PROTECTED'}
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-mono hidden sm:inline-block">
                  🔥 Firebase: organic-food-88c3a
                </span>
              </div>
              <p className="text-xs text-stone-400">Website Banner, Product Catalog & Security Manager (বাংলা ও ইংলিশ কন্ট্রোল)</p>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-white p-2 text-xl font-bold">
            ✕
          </button>
        </div>

        {/* Global Notification Banner */}
        {notification && (
          <div className="bg-emerald-800 text-white px-6 py-2.5 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Unauthenticated Login Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto text-stone-700 shadow-inner">
              <Shield className="w-8 h-8 text-emerald-800" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold font-display text-stone-900">Admin Authorization Required</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                আপনার ওয়েবসাইট সুরক্ষিত রাখতে এবং অনুমতি ছাড়া যেন কেউ ব্যানার বা পণ্য পরিবর্তন করতে না পারে, অনুগ্রহ করে আপনার পাসওয়ার্ড দিন।
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Owner Password (এডমিন পাসওয়ার্ড)
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter owner password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setAuthError('');
                    }}
                    className="w-full pr-10 pl-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-emerald-800 font-mono tracking-wider"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 p-1 text-stone-400 hover:text-stone-700"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {authError && (
                  <p className="text-[11px] text-rose-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{authError}</span>
                  </p>
                )}
                <p className="text-[11px] text-stone-400 mt-2">
                  Secret access route: <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-stone-600">/#admin</code>
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Unlock Admin Panel (লগইন করুন)</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <>
            {/* Navigation Tabs (Bilingual Bangla + English) */}
            <div className="flex border-b border-stone-200 bg-stone-50 px-6 gap-2 pt-2 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setActiveTab('banner')}
                className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  activeTab === 'banner'
                    ? 'border-emerald-800 text-emerald-900 bg-white rounded-t-lg'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <Image className="w-4 h-4" />
                <span>Banner & Hero (ব্যানার এডিটর)</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  activeTab === 'products'
                    ? 'border-emerald-800 text-emerald-900 bg-white rounded-t-lg'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <PackagePlus className="w-4 h-4" />
                <span>Products (পণ্য ও দাম - {products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('store')}
                className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  activeTab === 'store'
                    ? 'border-emerald-800 text-emerald-900 bg-white rounded-t-lg'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <Edit2 className="w-4 h-4" />
                <span>Store Info (দোকান ও ঠিকানা)</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  activeTab === 'security'
                    ? 'border-emerald-800 text-emerald-900 bg-white rounded-t-lg'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>Password (পাসওয়ার্ড পরিবর্তন)</span>
              </button>

              <button
                onClick={() => setActiveTab('firebase')}
                className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  activeTab === 'firebase'
                    ? 'border-amber-600 text-amber-900 bg-white rounded-t-lg'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <Flame className="w-4 h-4 text-amber-600" />
                <span>Firebase & Orders (অর্ডার ও ডাটাবেস)</span>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-stone-800 text-xs">
              
              {/* TAB 1: BANNER & HERO EDITOR */}
              {activeTab === 'banner' && (
                <form onSubmit={handleSaveBanner} className="space-y-5">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <div>
                      <h3 className="text-sm font-bold text-stone-900">Hero Banner Customization (ব্যানার পরিবর্তন)</h3>
                      <p className="text-stone-500 text-[11px]">Edit the main promotional banner, headlines, and morning harvest card in Bangla & English.</p>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg flex items-center gap-1.5 shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Banner (ব্যানার সেভ করুন)</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Top Kicker Badge (উপরের ব্যানার ট্যাগ)</label>
                      <input
                        type="text"
                        value={bannerDraft.kicker}
                        onChange={(e) => setBannerDraft({ ...bannerDraft, kicker: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800"
                        placeholder="100% Shuddho o Bish-Mukto Deshi Organic Farm Produce"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Store Promo Badge (স্টোর স্ট্যাটাস)</label>
                      <input
                        type="text"
                        value={bannerDraft.promoBadge}
                        onChange={(e) => setBannerDraft({ ...bannerDraft, promoBadge: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800"
                        placeholder="Ajker Fresh Harvest In-Stock · Shokal 7:30 to Raat 9:00"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Headline Prefix (প্রধান শিরোনামের শুরু)</label>
                      <input
                        type="text"
                        value={bannerDraft.headlinePrefix}
                        onChange={(e) => setBannerDraft({ ...bannerDraft, headlinePrefix: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800"
                        placeholder="Shera Fresh Organic Food & Taza Shobji in"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Headline Highlight City (হাইলাইট করা শহর)</label>
                      <input
                        type="text"
                        value={bannerDraft.headlineHighlight}
                        onChange={(e) => setBannerDraft({ ...bannerDraft, headlineHighlight: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800"
                        placeholder="Dhaka, Bangladesh"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Subheadline Description (ব্যানারের বিস্তারিত বিবরণ)</label>
                    <textarea
                      rows={3}
                      value={bannerDraft.subheadline}
                      onChange={(e) => setBannerDraft({ ...bannerDraft, subheadline: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800"
                      placeholder="Khet theke shorashori apnar rannaghore: Formalin-free shobji, taja fol, Sundarbaner raw modhu..."
                    ></textarea>
                  </div>

                  {/* Featured Item in Banner */}
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                    <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-800" />
                      <span>Featured Harvest Showcase in Banner (ব্যানারের বিশেষ পণ্য)</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-stone-600 mb-1">Featured Title (পণ্যের নাম)</label>
                        <input
                          type="text"
                          value={bannerDraft.featuredProduceTitle}
                          onChange={(e) => setBannerDraft({ ...bannerDraft, featuredProduceTitle: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 mb-1">Price Tag in ৳ (দাম টাকায়)</label>
                        <input
                          type="text"
                          value={bannerDraft.featuredProducePrice}
                          onChange={(e) => setBannerDraft({ ...bannerDraft, featuredProducePrice: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg font-mono"
                          placeholder="৳45 / আঁটি (per bunch)"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 mb-1">Artwork Emoji (ইমোজি)</label>
                        <input
                          type="text"
                          value={bannerDraft.featuredEmoji}
                          onChange={(e) => setBannerDraft({ ...bannerDraft, featuredEmoji: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-center text-lg"
                          placeholder="🥬, 🍯, 🍆, 🥭, 🧈"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-stone-600 mb-1">Subtitle / Origin Notice (উৎস ও বিবরণ)</label>
                      <input
                        type="text"
                        value={bannerDraft.featuredProduceSubtitle}
                        onChange={(e) => setBannerDraft({ ...bannerDraft, featuredProduceSubtitle: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg"
                        placeholder="Shokal 6:00 tay Narsingdi Organic Farm theke tola"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-xl shadow-sm"
                    >
                      Save & Apply to Website (ওয়েবসাইটে প্রয়োগ করুন)
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: PRODUCT MANAGER */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <div>
                      <h3 className="text-sm font-bold text-stone-900">Product Catalog Management (পণ্য ও দাম পরিবর্তন)</h3>
                      <p className="text-stone-500 text-[11px]">Add new organic items, update prices in ৳ (Tk), edit descriptions, or remove items.</p>
                    </div>
                    <button
                      onClick={() => setIsAddingNewProduct(!isAddingNewProduct)}
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg flex items-center gap-1.5"
                    >
                      <PackagePlus className="w-3.5 h-3.5" />
                      <span>{isAddingNewProduct ? 'Cancel' : '+ Add New Product (নতুন পণ্য যোগ করুন)'}</span>
                    </button>
                  </div>

                  {/* Add New Product Form (Bangladeshi ৳ Tk) */}
                  {isAddingNewProduct && (
                    <form onSubmit={handleAddNewProductSubmit} className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-4">
                      <h4 className="font-bold text-emerald-950 font-display text-sm">Add New Organic Produce Item (নতুন পণ্য ফরম)</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-stone-700 font-medium mb-1">Product Name (পণ্যের নাম) *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Deshi Taza Kacha Morich (Green Chilies)"
                            value={newProd.name}
                            onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-700 font-medium mb-1">Category (ক্যাটাগরি)</label>
                          <select
                            value={newProd.category}
                            onChange={(e) => setNewProd({ ...newProd, category: e.target.value as any })}
                            className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg"
                          >
                            <option value="vegetables">Organic Shobji & Shak (শাকসবজি)</option>
                            <option value="fruits">Seasonal Fol (ফলমূল)</option>
                            <option value="pantry">Khaati Pantry & Tel (তেল, ঘি ও মধু)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-stone-700 font-medium mb-1">Price (৳ Tk) *</label>
                          <input
                            type="number"
                            step="1"
                            required
                            placeholder="60"
                            value={newProd.price}
                            onChange={(e) => setNewProd({ ...newProd, price: parseFloat(e.target.value) })}
                            className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-700 font-medium mb-1">Unit (পরিমাপ)</label>
                          <input
                            type="text"
                            placeholder="প্রতি আঁটি / কেজি / ৫০০ গ্রাম জার"
                            value={newProd.unit}
                            onChange={(e) => setNewProd({ ...newProd, unit: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-700 font-medium mb-1">Farm Origin (খামারের উৎস)</label>
                          <input
                            type="text"
                            placeholder="e.g. Narsingdi Model Organic Farm"
                            value={newProd.farmOrigin}
                            onChange={(e) => setNewProd({ ...newProd, farmOrigin: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-stone-700 font-medium mb-1">Product Description (বিবরণী)</label>
                        <textarea
                          rows={2}
                          value={newProd.description}
                          onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                          placeholder="কীটনাশক মুক্ত, খাঁটি স্বাদ এবং পুষ্টি উপাদান সম্পর্কে লিখুন..."
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg"
                        ></textarea>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingNewProduct(false)}
                          className="px-4 py-2 bg-stone-200 rounded-lg text-stone-700"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-emerald-900 text-white font-semibold rounded-lg hover:bg-emerald-800"
                        >
                          Add Product (পণ্য যোগ করুন)
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List of Products (৳ Tk Currency) */}
                  <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden bg-white">
                    {products.map((item) => {
                      const isEditing = editingProductId === item.id;

                      if (isEditing) {
                        return (
                          <div key={item.id} className="p-4 bg-stone-50 space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              <div>
                                <label className="text-[10px] text-stone-500 font-medium">Name</label>
                                <input
                                  type="text"
                                  defaultValue={item.name}
                                  id={`edit-name-${item.id}`}
                                  className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-stone-500 font-medium">Price in ৳ (Tk)</label>
                                <input
                                  type="number"
                                  step="1"
                                  defaultValue={item.price}
                                  id={`edit-price-${item.id}`}
                                  className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg font-mono font-bold"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-stone-500 font-medium">Origin</label>
                                <input
                                  type="text"
                                  defaultValue={item.farmOrigin}
                                  id={`edit-farm-${item.id}`}
                                  className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg"
                                />
                              </div>
                            </div>

                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setEditingProductId(null)}
                                className="px-3 py-1 text-stone-600 bg-stone-200 rounded text-xs"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => {
                                  const nameInput = (document.getElementById(`edit-name-${item.id}`) as HTMLInputElement).value;
                                  const priceInput = parseFloat((document.getElementById(`edit-price-${item.id}`) as HTMLInputElement).value);
                                  const farmInput = (document.getElementById(`edit-farm-${item.id}`) as HTMLInputElement).value;
                                  handleSaveProductEdit({
                                    ...item,
                                    name: nameInput || item.name,
                                    price: isNaN(priceInput) ? item.price : priceInput,
                                    farmOrigin: farmInput || item.farmOrigin
                                  });
                                }}
                                className="px-3 py-1 bg-emerald-900 text-white rounded font-semibold text-xs"
                              >
                                Save (সংরক্ষণ করুন)
                              </button>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={item.id} className="p-3 sm:p-4 flex items-center justify-between gap-4 hover:bg-stone-50/80 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-lg">
                              🌱
                            </div>
                            <div>
                              <h4 className="font-semibold text-stone-900">{item.name}</h4>
                              <div className="flex items-center gap-2 text-[11px] text-stone-500">
                                <span>{item.categoryLabel}</span>
                                <span>·</span>
                                <span>{item.farmOrigin}</span>
                                <span>·</span>
                                <span className="font-mono font-bold text-emerald-900">৳{item.price.toFixed(0)} Tk {item.unit}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingProductId(item.id)}
                              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-md"
                              title="Edit product"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(item.id)}
                              className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-md"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: STORE INFO & BRAND */}
              {activeTab === 'store' && (
                <form onSubmit={handleSaveStore} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <div>
                      <h3 className="text-sm font-bold text-stone-900">Website Branding & Contact Details (দোকানের তথ্য)</h3>
                      <p className="text-stone-500 text-[11px]">Changes here update the navigation title, footer, phone numbers, and address.</p>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg flex items-center gap-1.5 shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Info (সংরক্ষণ করুন)</span>
                    </button>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Website & Business Name (নাম)</label>
                    <input
                      type="text"
                      value={locationDraft.name}
                      onChange={(e) => setLocationDraft({ ...locationDraft, name: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg"
                      placeholder="Organic Food"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Brand Tagline (স্লোগান)</label>
                    <input
                      type="text"
                      value={locationDraft.tagline}
                      onChange={(e) => setLocationDraft({ ...locationDraft, tagline: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Customer Care Phone (মোবাইল নম্বর)</label>
                      <input
                        type="text"
                        value={locationDraft.phone}
                        onChange={(e) => setLocationDraft({ ...locationDraft, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Store Email (ইমেইল)</label>
                      <input
                        type="email"
                        value={locationDraft.email}
                        onChange={(e) => setLocationDraft({ ...locationDraft, email: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-stone-700 mb-1">Street Address (ঠিকানা)</label>
                      <input
                        type="text"
                        value={locationDraft.street}
                        onChange={(e) => setLocationDraft({ ...locationDraft, street: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Postal Code (পোস্টাল কোড)</label>
                      <input
                        type="text"
                        value={locationDraft.zip}
                        onChange={(e) => setLocationDraft({ ...locationDraft, zip: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-xl"
                    >
                      Update Store Information (আপডেট করুন)
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 4: SECURITY & PASSWORD */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">Change Admin Password (পাসওয়ার্ড পরিবর্তন)</h3>
                    <p className="text-stone-500 text-[11px]">Set a private password known only to you so no unauthorized visitors can tamper with your Organic Food store.</p>
                  </div>

                  <form onSubmit={handlePasswordChangeSubmit} className="p-5 bg-stone-50 rounded-2xl border border-stone-200 max-w-md space-y-4">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Current Password (বর্তমান পাসওয়ার্ড)</label>
                      <input
                        type="password"
                        required
                        value={currentPasswordCheck}
                        onChange={(e) => setCurrentPasswordCheck(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg"
                        placeholder="Current password"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">New Secret Admin Password (নতুন পাসওয়ার্ড)</label>
                      <input
                        type="password"
                        required
                        value={newPasswordValue}
                        onChange={(e) => setNewPasswordValue(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg"
                        placeholder="New password (min 4 characters)"
                      />
                    </div>

                    {passwordChangeError && (
                      <p className="text-[11px] text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{passwordChangeError}</span>
                      </p>
                    )}

                    {passwordSuccess && (
                      <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>{passwordSuccess}</span>
                      </p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-2.5 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-xl shadow-sm"
                    >
                      Update Admin Password (পাসওয়ার্ড সংরক্ষণ করুন)
                    </button>
                  </form>

                  {/* Reset Defaults */}
                  <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-stone-900">Reset Website to Defaults (ডিফল্ট রিসেট)</h4>
                      <p className="text-stone-500 text-[11px]">Clear custom localStorage edits and restore fresh initial produce catalog and layout.</p>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm('Reset all custom changes to default? (সব পরিবর্তন রিসেট করবেন?)')) {
                          onResetDefaults();
                          showNotification('Website reset to default configuration.');
                        }
                      }}
                      className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-200 hover:bg-stone-300 rounded-lg flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Defaults (রিসেট)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 5: FIREBASE & ORDERS MANAGEMENT */}
              {activeTab === 'firebase' && (
                <div className="space-y-6">
                  {/* Firebase Project Status Header */}
                  <div className="p-5 bg-gradient-to-r from-amber-950/10 via-amber-900/5 to-transparent rounded-2xl border border-amber-300/40 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600">
                          <Flame className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-stone-900">Firebase Cloud Database</h3>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono px-2 py-0.5 rounded-full font-semibold">
                              Connected
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-600">
                            Project ID: <span className="font-mono font-bold text-amber-950">{FIREBASE_APP_CONFIG.projectId}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleTestConnection}
                          disabled={firebaseStatus.testing}
                          className="px-3.5 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${firebaseStatus.testing ? 'animate-spin' : ''}`} />
                          <span>{firebaseStatus.testing ? 'Testing...' : 'Test Connection (সংযোগ পরীক্ষা)'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Status message */}
                    <div className="p-3 bg-white/80 rounded-xl border border-amber-200/60 flex items-center justify-between text-[11px]">
                      <span className="text-stone-700 font-medium">{firebaseStatus.message}</span>
                      <span className="font-mono text-stone-500">Region: asia-southeast1</span>
                    </div>

                    {/* Firebase Auth state & quick login */}
                    <div className="pt-2 border-t border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        {authUser ? (
                          <div className="flex items-center gap-2 text-emerald-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Signed in as Firebase Admin: <strong>{authUser.email || authUser.displayName || 'Authorized Admin'}</strong></span>
                          </div>
                        ) : (
                          <span className="text-stone-600">
                            Optional: Authenticate via Google to manage cloud rules and restricted operations.
                          </span>
                        )}
                      </div>

                      <div>
                        {authUser ? (
                          <button
                            type="button"
                            onClick={handleGoogleSignOut}
                            className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg flex items-center gap-1 transition-colors"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
                          >
                            <LogIn className="w-3.5 h-3.5 text-amber-400" />
                            <span>Sign in with Google (Firebase)</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Customer Orders Collection (/orders) */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <PackagePlus className="w-4 h-4 text-emerald-800" />
                        <h4 className="text-sm font-bold text-stone-900">
                          Customer Orders (গ্রাহকদের অর্ডার - {recentOrders.length})
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={refreshFirebaseData}
                        disabled={isLoadingFirebaseData}
                        className="px-3 py-1 text-[11px] font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <RefreshCw className={`w-3 h-3 ${isLoadingFirebaseData ? 'animate-spin' : ''}`} />
                        <span>Refresh (রিফ্রেশ)</span>
                      </button>
                    </div>

                    {recentOrders.length === 0 ? (
                      <div className="p-8 text-center bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
                        <Database className="w-8 h-8 text-stone-300 mx-auto" />
                        <p className="font-semibold text-stone-700">No Orders Placed Yet (এখনও কোনো অর্ডার আসেনি)</p>
                        <p className="text-[11px] text-stone-500 max-w-sm mx-auto">
                          When customers add fresh produce to their bag and confirm an order, it will appear here in real-time and sync to Firebase Firestore.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                        {recentOrders.map((order) => (
                          <div
                            key={order.id}
                            className="p-4 bg-white rounded-xl border border-stone-200 hover:border-emerald-600 transition-colors shadow-xs space-y-3"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-stone-100">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                                  {order.id}
                                </span>
                                <span className="text-stone-400 text-[10px]">
                                  {new Date(order.createdAt).toLocaleString('bn-BD', { dateStyle: 'short', timeStyle: 'short' })}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                                  order.deliveryType === 'delivery'
                                    ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                }`}>
                                  {order.deliveryType === 'delivery' ? 'Home Delivery (হোম ডেলিভারি)' : 'Curbside Pickup (দোকান পিকআপ)'}
                                </span>
                                <span className="text-[10px] font-semibold uppercase bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                                  {order.paymentMethod}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700">
                              <div>
                                <p className="text-[10px] text-stone-400">Customer Details (গ্রাহক):</p>
                                <p className="font-semibold text-stone-900">{order.customerName}</p>
                                <p className="font-mono text-emerald-800">{order.customerPhone}</p>
                                {order.customerAddress && (
                                  <p className="text-[11px] text-stone-600 mt-0.5">{order.customerAddress}</p>
                                )}
                              </div>
                              <div className="sm:text-right">
                                <p className="text-[10px] text-stone-400">Total Bill (মোট টাকা):</p>
                                <p className="text-base font-bold font-mono text-emerald-950">৳{order.total.toFixed(0)}</p>
                                <p className="text-[10px] text-stone-500">
                                  Subtotal ৳{order.subtotal} + Delivery ৳{order.deliveryFee}
                                </p>
                              </div>
                            </div>

                            {/* Items list */}
                            <div className="p-2.5 bg-stone-50 rounded-lg text-[11px] space-y-1">
                              <p className="text-[10px] font-semibold text-stone-500">Order Items (পণ্যের তালিকা):</p>
                              <div className="flex flex-wrap gap-2">
                                {order.items.map((item, idx) => (
                                  <span key={idx} className="bg-white border border-stone-200 px-2 py-0.5 rounded text-stone-800">
                                    {item.qty}x {item.name} (৳{item.price * item.qty})
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Customer Inquiries Collection (/inquiries) */}
                  <div className="space-y-3 pt-3 border-t border-stone-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-amber-600" />
                        <h4 className="text-sm font-bold text-stone-900">
                          Customer Inquiries & Reservations (যোগাযোগ ও অনুসন্ধান - {recentInquiries.length})
                        </h4>
                      </div>
                    </div>

                    {recentInquiries.length === 0 ? (
                      <p className="text-[11px] text-stone-500 italic p-3 bg-stone-50 rounded-xl">
                        No inquiries submitted yet. Messages from the contact page will appear here.
                      </p>
                    ) : (
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {recentInquiries.map((inq) => (
                          <div key={inq.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] space-y-1">
                            <div className="flex justify-between font-semibold text-stone-900">
                              <span>{inq.fullName} ({inq.phone})</span>
                              <span className="font-mono text-stone-400 text-[10px]">
                                {new Date(inq.createdAt).toLocaleDateString('bn-BD')}
                              </span>
                            </div>
                            {inq.email && <p className="text-stone-500">{inq.email}</p>}
                            {inq.notes && <p className="text-stone-700 bg-white p-2 rounded border border-stone-200/60 mt-1">{inq.notes}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Firebase Configuration Inspector */}
                  <div className="p-4 bg-stone-900 text-stone-200 rounded-2xl font-mono text-[11px] space-y-2">
                    <div className="flex items-center justify-between text-amber-400 font-bold">
                      <span>Firebase SDK Configuration Loaded:</span>
                      <span className="text-[10px] text-stone-400">firebase-applet-config.json</span>
                    </div>
                    <pre className="overflow-x-auto text-[10px] text-stone-300">
                      {JSON.stringify(FIREBASE_APP_CONFIG, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
              <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>সব পরিবর্তন স্বয়ংক্রিয়ভাবে ব্রাউজারে সংরক্ষিত থাকে (Saved in LocalStorage)</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
                >
                  Lock Panel (লক করুন)
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg"
                >
                  Done & Close (বন্ধ করুন)
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
