import React from 'react';
import { ArrowRight, Sprout, ShieldCheck, Truck, Clock, MapPin } from 'lucide-react';
import { BusinessLocation, BannerConfig, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeroSectionProps {
  location: BusinessLocation;
  bannerConfig: BannerConfig;
  currentLang: Language;
  onExploreProducts: () => void;
  onViewLocation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  location,
  bannerConfig,
  currentLang,
  onExploreProducts,
  onViewLocation
}) => {
  const t = TRANSLATIONS[currentLang];

  const kickerText = bannerConfig.kicker || t.hero.kicker;
  const headlinePrefix = bannerConfig.headlinePrefix || t.hero.headlinePrefix;
  const headlineHighlight = bannerConfig.headlineHighlight.trim() !== ''
    ? bannerConfig.headlineHighlight
    : `${location.city}, Bangladesh`;
  const subheadline = bannerConfig.subheadline || t.hero.subheadline;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f5f3ec] via-[#faf9f5] to-[#faf9f5] pt-10 pb-16 md:pt-16 md:pb-24 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Geo & Freshness Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-emerald-800 uppercase">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {kickerText}
              </span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span>{t.hero.nonGmo}</span>
            </div>

            {/* Local SEO H1 Tag */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.1] font-display text-balance">
              {headlinePrefix}{' '}
              <span className="text-emerald-900 underline decoration-emerald-500/40 decoration-wavy underline-offset-6">
                {headlineHighlight}
              </span>
            </h1>

            {/* H2 Subheading */}
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
              {subheadline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreProducts}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 group"
              >
                <span>{t.hero.browseBtn}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onViewLocation}
                className="px-5 py-3.5 text-sm font-medium text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl transition-colors flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-emerald-800" />
                <span>{t.hero.visitBtn}</span>
              </button>
            </div>

            {/* Local Trust & Ratings */}
            <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center gap-6 text-xs text-stone-600">
              <div className="flex items-center gap-1.5 font-medium text-stone-900">
                <span className="text-amber-500">★★★★★</span>
                <span className="font-bold tabular-nums">{location.rating}</span>
                <span className="text-stone-500 font-normal">({location.reviewCount} {t.hero.verifiedReviews})</span>
              </div>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <div className="flex items-center gap-1 text-emerald-900 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{t.hero.expressReady}</span>
              </div>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <div className="flex items-center gap-1 text-emerald-900 font-medium">
                <Truck className="w-3.5 h-3.5" />
                <span>{t.hero.freeDeliveryNote}</span>
              </div>
            </div>

          </div>

          {/* Hero Visual: Farm Stand Illustration & Local Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-900 via-stone-900 to-emerald-950 p-7 text-white shadow-2xl border border-emerald-800/40">
              
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

              <div className="relative z-10 space-y-6">
                
                {/* Store Status Banner */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">{t.hero.localFarmStand}</span>
                    <h3 className="text-xl font-bold font-display text-stone-100">{location.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-900/60 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      {bannerConfig.promoBadge || t.hero.openToday}
                    </span>
                  </div>
                </div>

                {/* Hero Showcase Produce Feature */}
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-300">
                    <span>{t.hero.morningSpecial}</span>
                    <span className="text-amber-300 font-semibold">{t.hero.arrivedAt}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-emerald-800/50 flex items-center justify-center text-3xl border border-emerald-500/30 shrink-0">
                      {bannerConfig.featuredEmoji || '🥬'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-base text-white">{bannerConfig.featuredProduceTitle}</h4>
                      <p className="text-xs text-stone-300">{bannerConfig.featuredProduceSubtitle}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                    <span className="text-stone-300 font-mono tabular-nums">{bannerConfig.featuredProducePrice}</span>
                    <span className="text-emerald-300 font-medium">{t.hero.nonGmo}</span>
                  </div>
                </div>

                {/* Local Guarantee Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 text-emerald-300 font-semibold mb-1">
                      <Sprout className="w-4 h-4" />
                      <span>{t.hero.zeroSpraysTitle}</span>
                    </div>
                    <p className="text-stone-300 text-[11px]">{t.hero.zeroSpraysDesc}</p>
                  </div>

                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 text-emerald-300 font-semibold mb-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{t.hero.localDirectTitle}</span>
                    </div>
                    <p className="text-stone-300 text-[11px]">{t.hero.localDirectDesc}</p>
                  </div>
                </div>

                {/* Physical Store Address Preview */}
                <div className="bg-emerald-950/80 p-3.5 rounded-xl border border-emerald-700/40 text-xs text-stone-300 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{location.street}</p>
                    <p className="text-stone-400">{location.city}, {location.state} {location.zip}</p>
                  </div>
                  <button 
                    onClick={onViewLocation}
                    className="text-emerald-300 hover:text-emerald-200 text-xs font-semibold underline underline-offset-2"
                  >
                    {t.hero.directions}
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
