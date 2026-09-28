import React from 'react';
import { Sprout, HeartHandshake, ShieldCheck, SunMedium, Award, Users } from 'lucide-react';
import { BusinessLocation, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AboutSectionProps {
  location: BusinessLocation;
  currentLang: Language;
  onViewContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ location, currentLang, onViewContact }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section id="about" className="py-16 md:py-24 bg-white border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{t.about.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-display text-balance">
            {t.about.heading} ({location.city})
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            {t.about.description}
          </p>
        </div>

        {/* 4 Pillars of Local Organic Integrity */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <article className="p-6 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
              <Sprout className="w-5 h-5 text-emerald-800" />
            </div>
            <h3 className="text-base font-bold text-stone-900 font-display">
              {t.about.p1Title}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t.about.p1Desc}
            </p>
          </article>

          <article className="p-6 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
              <SunMedium className="w-5 h-5 text-emerald-800" />
            </div>
            <h3 className="text-base font-bold text-stone-900 font-display">
              {t.about.p2Title}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t.about.p2Desc}
            </p>
          </article>

          <article className="p-6 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
              <Award className="w-5 h-5 text-emerald-800" />
            </div>
            <h3 className="text-base font-bold text-stone-900 font-display">
              {t.about.p3Title}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t.about.p3Desc}
            </p>
          </article>

          <article className="p-6 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
              <Users className="w-5 h-5 text-emerald-800" />
            </div>
            <h3 className="text-base font-bold text-stone-900 font-display">
              {t.about.p4Title}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t.about.p4Desc}
            </p>
          </article>
        </div>

        {/* Local Community Adjacency Callout */}
        <div className="p-8 rounded-3xl bg-emerald-950 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
              {location.city} Neighborhood Farm Hub
            </span>
            <h3 className="text-2xl font-bold font-display text-white">
              {t.about.bannerTitle}
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              {t.about.bannerDesc}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={onViewContact}
              className="px-6 py-3 text-xs font-semibold text-stone-950 bg-emerald-300 hover:bg-emerald-200 rounded-xl transition-colors shadow-sm"
            >
              {t.about.bannerBtn}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
