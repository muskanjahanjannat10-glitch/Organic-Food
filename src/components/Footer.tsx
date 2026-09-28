import React from 'react';
import { MapPin, Phone, Mail, FileCode, CheckCircle } from 'lucide-react';
import { BusinessLocation, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  location: BusinessLocation;
  currentLang: Language;
  onOpenSeoModal: () => void;
  onOpenLocationModal: () => void;
  onOpenFirebaseModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  location,
  currentLang,
  onOpenSeoModal,
  onOpenLocationModal,
  onOpenFirebaseModal
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Mission */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold font-display text-white">{location.name}</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenLocationModal}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{t.footer.switchLocation(location.city)}</span>
              </button>
            </div>
          </div>

          {/* Quick NAP Contact Info */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-sm text-white font-display">{t.footer.nap}</h4>
            <div className="space-y-1.5 text-stone-400">
              <p className="text-stone-300 font-medium">{location.street}</p>
              <p>{location.city}, {location.state} {location.zip}, Bangladesh</p>
              <p className="pt-1">
                <a href={`tel:${location.phone}`} className="text-white hover:text-emerald-400 font-semibold font-mono">
                  {location.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${location.email}`} className="text-emerald-400 hover:underline">
                  {location.email}
                </a>
              </p>
            </div>
          </div>

          {/* Clean URL Hierarchy Navigation */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-sm text-white font-display">{t.footer.urls}</h4>
            <ul className="space-y-1.5 text-stone-400">
              <li><a href="#home" className="hover:text-white transition-colors">/home &ndash; {t.nav.home}</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">/products/organic-vegetables &ndash; {t.nav.products}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">/about-us &ndash; {t.nav.about}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">/contact-us &ndash; {t.nav.contact}</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">/reviews &ndash; {t.nav.reviews}</a></li>
            </ul>
          </div>

          {/* Local SEO & Crawler Directives */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-sm text-white font-display">{t.footer.seo}</h4>
            <p className="text-stone-400 text-xs">
              {t.footer.seoDesc}
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onOpenSeoModal}
                className="px-3 py-2 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{t.footer.seoBtn}</span>
              </button>
              <div className="flex items-center gap-3 text-[11px] text-stone-400 pt-1">
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 underline">
                  /sitemap.xml
                </a>
                <span>·</span>
                <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 underline">
                  /robots.txt
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {location.name}. {t.footer.allRights}</span>
            {/* Subtle owner entrance for #admin */}
            <a 
              href="#admin" 
              title="Owner Portal (#admin)" 
              className="text-stone-600 hover:text-stone-400 opacity-40 hover:opacity-100 transition-opacity font-mono text-[10px]"
            >
              #
            </a>
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenFirebaseModal}
              title="Click to inspect Firebase Cloud Sync (organic-food-88c3a)"
              className="inline-flex items-center gap-1.5 text-[11px] text-amber-300 hover:text-amber-200 bg-amber-950/60 hover:bg-amber-950 border border-amber-500/40 hover:border-amber-400 px-2.5 py-1 rounded-full font-mono transition-all cursor-pointer shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Firebase: organic-food-88c3a</span>
              <span className="text-[9px] bg-amber-500/20 px-1 rounded text-amber-300">চেক করুন</span>
            </button>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{t.footer.badge}</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
