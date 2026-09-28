/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductsCatalog } from './components/ProductsCatalog';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { SeoToolkitModal } from './components/SeoToolkitModal';
import { LocationCustomizerModal } from './components/LocationCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AdminPanelModal } from './components/AdminPanelModal';
import { LOCATION_PRESETS, ORGANIC_PRODUCTS, CUSTOMER_REVIEWS, DEFAULT_BANNER_CONFIG, generateLocalBusinessSchema } from './data/storeData';
import { BusinessLocation, ProductItem, BannerConfig, Language } from './types';

export default function App() {
  // Language State: 'bn' (বাংলা) or 'en' (English), toggled via button
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem('organic_food_lang');
      return (savedLang === 'en' || savedLang === 'bn') ? savedLang : 'bn';
    } catch {
      return 'bn';
    }
  });

  // Store Location & Name (Defaults to Dhaka, Bangladesh)
  const [currentLocation, setCurrentLocation] = useState<BusinessLocation>(() => {
    try {
      const saved = localStorage.getItem('organic_food_location');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && (parsed.city === 'Dhaka' || parsed.city === 'Chittagong' || parsed.city === 'Sylhet' || parsed.city === 'Rajshahi')) {
          return parsed;
        }
      }
      return LOCATION_PRESETS.dhaka;
    } catch {
      return LOCATION_PRESETS.dhaka;
    }
  });

  // Banner Configuration (Customizable by Owner in Admin Panel)
  const [bannerConfig, setBannerConfig] = useState<BannerConfig>(() => {
    try {
      const saved = localStorage.getItem('organic_food_banner');
      return saved ? JSON.parse(saved) : DEFAULT_BANNER_CONFIG;
    } catch {
      return DEFAULT_BANNER_CONFIG;
    }
  });

  // Product Catalog (Customizable by Owner in Admin Panel)
  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = localStorage.getItem('organic_food_products');
      return saved ? JSON.parse(saved) : ORGANIC_PRODUCTS;
    } catch {
      return ORGANIC_PRODUCTS;
    }
  });

  // Cart / Pickup Bag starts strictly at 0 ({})
  const [cartItems, setCartItems] = useState<{ [id: string]: number }>({});

  // Wishlist starts strictly at 0 ([])
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Admin secret password (Owner can change in Admin Panel)
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem('organic_food_admin_pw') || 'admin123';
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [isSeoModalOpen, setIsSeoModalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Handle Language Toggle Button
  const handleToggleLang = (lang: Language) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem('organic_food_lang', lang);
      document.documentElement.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
    } catch {
      // ignore
    }
  };

  // Secret URL Hash Listener: typing /#admin or clicking # in URL opens Admin Panel
  useEffect(() => {
    const handleCheckHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#/admin' || hash === '#owner') {
        setIsAdminOpen(true);
      }
    };

    handleCheckHash();
    window.addEventListener('hashchange', handleCheckHash);
    return () => window.removeEventListener('hashchange', handleCheckHash);
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    const hash = window.location.hash.toLowerCase();
    if (hash === '#admin' || hash === '#/admin' || hash === '#owner') {
      try {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch {
        window.location.hash = '';
      }
    }
  };

  // Synchronize document metadata and dynamic JSON-LD schema
  useEffect(() => {
    const siteTitle = currentLang === 'bn'
      ? `${currentLocation.name || 'Organic Food'} | সেরা খাঁটি অর্গানিক ফুড স্টোর (${currentLocation.city})`
      : `${currentLocation.name || 'Organic Food'} | Best Organic Food Store in ${currentLocation.city}, Bangladesh`;
    document.title = siteTitle;
    
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute(
        'content',
        currentLang === 'bn'
          ? `১০০% ফরমালিন ও বিষ-মুক্ত তাজা শাকসবজি, সুন্দরবনের মধু ও খাঁটি ঘানির সরিষার তেল কিনুন Organic Food থেকে। একই দিনে হোম ডেলিভারি ও পিকআপ।`
          : `Shop fresh 100% certified organic vegetables, farm-picked fruits, and local artisan groceries in ${currentLocation.city}, Bangladesh at ${currentLocation.name}. Same-day local pickup and neighborhood delivery.`
      );
    }

    const schemaScript = document.getElementById('localbusiness-schema');
    if (schemaScript) {
      schemaScript.textContent = generateLocalBusinessSchema(currentLocation);
    }
  }, [currentLocation, currentLang]);

  // Save changes to localStorage
  const handleUpdateBanner = (newBanner: BannerConfig) => {
    setBannerConfig(newBanner);
    localStorage.setItem('organic_food_banner', JSON.stringify(newBanner));
  };

  const handleUpdateProducts = (newProds: ProductItem[]) => {
    setProducts(newProds);
    localStorage.setItem('organic_food_products', JSON.stringify(newProds));
  };

  const handleUpdateLocation = (newLoc: BusinessLocation) => {
    setCurrentLocation(newLoc);
    localStorage.setItem('organic_food_location', JSON.stringify(newLoc));
  };

  const handleChangeAdminPassword = (newPw: string) => {
    setAdminPassword(newPw);
    localStorage.setItem('organic_food_admin_pw', newPw);
  };

  const handleResetDefaults = () => {
    localStorage.removeItem('organic_food_banner');
    localStorage.removeItem('organic_food_products');
    localStorage.removeItem('organic_food_location');
    localStorage.removeItem('organic_food_admin_pw');
    setBannerConfig(DEFAULT_BANNER_CONFIG);
    setProducts(ORGANIC_PRODUCTS);
    setCurrentLocation(LOCATION_PRESETS.dhaka);
    setAdminPassword('admin123');
  };

  // Cart Handlers (Live count increments)
  const totalCartCount = Object.values(cartItems).reduce((sum, q) => sum + q, 0);

  const handleAddToCart = (product: ProductItem) => {
    setCartItems(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems(prev => {
      const current = prev[productId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: next };
    });
  };

  const handleClearCart = () => {
    setCartItems({});
  };

  // Wishlist Handlers (Starts at 0, live toggle increments/decrements)
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleClearWishlist = () => {
    setWishlistIds([]);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f5] text-stone-900 selection:bg-emerald-200 selection:text-emerald-950 font-sans">
      
      {/* 3-Zone Top Bar Navigation with Language Toggle Button */}
      <Navbar
        currentLocation={currentLocation}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onOpenSeoModal={() => setIsSeoModalOpen(true)}
        activeSection={activeSection}
        setActiveSection={scrollToSection}
      />

      {/* Main Semantic Content Area */}
      <main className="flex-1">
        
        {/* Hero Section with Live Customizable Banner */}
        <div id="home">
          <HeroSection
            location={currentLocation}
            bannerConfig={bannerConfig}
            currentLang={currentLang}
            onExploreProducts={() => scrollToSection('products')}
            onViewLocation={() => scrollToSection('contact')}
          />
        </div>

        {/* Featured Organic Produce Catalog with Wishlist Heart Controls */}
        <ProductsCatalog
          products={products}
          location={currentLocation}
          currentLang={currentLang}
          onAddToCart={handleAddToCart}
          cartItems={cartItems}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* About Us & Farm Integrity Principles */}
        <AboutSection
          location={currentLocation}
          currentLang={currentLang}
          onViewContact={() => scrollToSection('contact')}
        />

        {/* Verified Local Customer Reviews & Schema Ratings */}
        <ReviewsSection
          reviews={CUSTOMER_REVIEWS}
          location={currentLocation}
          currentLang={currentLang}
        />

        {/* Contact Page, Google Maps Embed & Operating Hours */}
        <ContactSection
          location={currentLocation}
          currentLang={currentLang}
        />

      </main>

      {/* Semantic Footer */}
      <Footer
        location={currentLocation}
        currentLang={currentLang}
        onOpenSeoModal={() => setIsSeoModalOpen(true)}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
      />

      {/* Modals & Slide-over Drawers */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        products={products}
        currentLang={currentLang}
        onToggleWishlist={handleToggleWishlist}
        onMoveToCart={handleAddToCart}
        onClearWishlist={handleClearWishlist}
      />

      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
        products={products}
        bannerConfig={bannerConfig}
        currentLocation={currentLocation}
        adminPasswordHash={adminPassword}
        onUpdateBanner={handleUpdateBanner}
        onUpdateProducts={handleUpdateProducts}
        onUpdateLocation={handleUpdateLocation}
        onChangeAdminPassword={handleChangeAdminPassword}
        onResetDefaults={handleResetDefaults}
      />

      <SeoToolkitModal
        isOpen={isSeoModalOpen}
        onClose={() => setIsSeoModalOpen(false)}
        location={currentLocation}
      />

      <LocationCustomizerModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={currentLocation}
        onUpdateLocation={handleUpdateLocation}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        products={products}
        location={currentLocation}
        currentLang={currentLang}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
