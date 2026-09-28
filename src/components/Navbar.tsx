import React from 'react';
import { ShoppingBag, MapPin, CodeXml, Heart, Lock } from 'lucide-react';
import { BusinessLocation, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { LanguageToggle } from './LanguageToggle';

interface NavbarProps {
  currentLocation: BusinessLocation;
  cartCount: number;
  wishlistCount: number;
  currentLang: Language;
  onToggleLang: (lang: Language) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAdmin: () => void;
  onOpenLocationModal: () => void;
  onOpenSeoModal: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLocation,
  cartCount,
  wishlistCount,
  currentLang,
  onToggleLang,
  onOpenCart,
  onOpenWishlist,
  onOpenAdmin,
  onOpenLocationModal,
  onOpenSeoModal,
  activeSection,
  setActiveSection
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f5]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark: Organic Food */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); setActiveSection('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-2xl font-bold tracking-tight text-emerald-950 font-display hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <span>{currentLocation.name || 'Organic Food'}</span>
        </a>

        {/* Zone 2: Clean text navigation links in chosen language */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-stone-700">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); setActiveSection('home'); }}
            className={`transition-colors hover:text-emerald-900 ${activeSection === 'home' ? 'text-emerald-900 font-bold' : ''}`}
          >
            {t.nav.home}
          </a>
          <a
            href="#products"
            onClick={(e) => { e.preventDefault(); setActiveSection('products'); }}
            className={`transition-colors hover:text-emerald-900 ${activeSection === 'products' ? 'text-emerald-900 font-bold' : ''}`}
          >
            {t.nav.products}
          </a>
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); setActiveSection('about'); }}
            className={`transition-colors hover:text-emerald-900 ${activeSection === 'about' ? 'text-emerald-900 font-bold' : ''}`}
          >
            {t.nav.about}
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); setActiveSection('contact'); }}
            className={`transition-colors hover:text-emerald-900 ${activeSection === 'contact' ? 'text-emerald-900 font-bold' : ''}`}
          >
            {t.nav.contact}
          </a>
          <a
            href="#reviews"
            onClick={(e) => { e.preventDefault(); setActiveSection('reviews'); }}
            className={`transition-colors hover:text-emerald-900 ${activeSection === 'reviews' ? 'text-emerald-900 font-bold' : ''}`}
          >
            {t.nav.reviews}
          </a>
        </nav>

        {/* Zone 3: Actions (Language Switcher Button, Location, SEO, Wishlist, Pickup Bag) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Prominent Language Switcher Button (বাংলা / ENG Toggle) */}
          <LanguageToggle
            currentLang={currentLang}
            onToggle={onToggleLang}
          />

          {/* Location Switcher Button */}
          <button
            onClick={onOpenLocationModal}
            title={t.nav.switchLocation}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200/80 rounded-lg transition-colors border border-stone-200/80"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="whitespace-nowrap">{currentLocation.city}</span>
          </button>

          {/* SEO Specs Toolkit */}
          <button
            onClick={onOpenSeoModal}
            title="Local SEO Technical Specifications & Schemas"
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/70 rounded-lg transition-colors"
          >
            <CodeXml className="w-3.5 h-3.5 text-emerald-700" />
            <span className="whitespace-nowrap">{t.nav.seo}</span>
          </button>

          {/* Wishlist Button with Live Counter (Starts at 0) */}
          <button
            onClick={onOpenWishlist}
            aria-label="Open Wishlist"
            title={t.nav.wishlist}
            className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-medium text-stone-800 bg-white hover:bg-rose-50 border border-stone-200 hover:border-rose-200 rounded-lg transition-colors"
          >
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-stone-600'}`} />
            <span className="hidden sm:inline">{t.nav.wishlist}</span>
            <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full tabular-nums ${
              wishlistCount > 0 ? 'bg-rose-600 text-white' : 'bg-stone-100 text-stone-600'
            }`}>
              {wishlistCount}
            </span>
          </button>

          {/* Local Pickup Basket with Live Counter (Starts at 0) */}
          <button
            onClick={onOpenCart}
            aria-label="Open Local Pickup Basket"
            title={t.nav.cart}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">{t.nav.cart}</span>
            <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full tabular-nums ${
              cartCount > 0 ? 'bg-emerald-500 text-white' : 'bg-emerald-950 text-emerald-300'
            }`}>
              {cartCount}
            </span>
          </button>

        </div>

      </div>

      {/* Mobile Subnav Strip */}
      <div className="lg:hidden flex items-center justify-around py-2 px-3 bg-stone-100/90 border-t border-stone-200 text-xs font-medium text-stone-700 overflow-x-auto gap-2">
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); setActiveSection('home'); }} 
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeSection === 'home' ? 'text-emerald-900 font-bold bg-white' : ''}`}
        >
          {t.nav.home}
        </a>
        <a 
          href="#products" 
          onClick={(e) => { e.preventDefault(); setActiveSection('products'); }} 
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeSection === 'products' ? 'text-emerald-900 font-bold bg-white' : ''}`}
        >
          {t.nav.products}
        </a>
        <a 
          href="#about" 
          onClick={(e) => { e.preventDefault(); setActiveSection('about'); }} 
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeSection === 'about' ? 'text-emerald-900 font-bold bg-white' : ''}`}
        >
          {t.nav.about}
        </a>
        <a 
          href="#contact" 
          onClick={(e) => { e.preventDefault(); setActiveSection('contact'); }} 
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeSection === 'contact' ? 'text-emerald-900 font-bold bg-white' : ''}`}
        >
          {t.nav.contact}
        </a>
        <button
          onClick={onOpenLocationModal}
          className="px-2 py-1 rounded text-emerald-900 font-bold flex items-center gap-1 bg-white border border-stone-200"
        >
          <MapPin className="w-3 h-3" />
          <span>{currentLocation.city}</span>
        </button>
      </div>

    </header>
  );
};
