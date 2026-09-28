import React from 'react';
import { Star, ShieldCheck, CheckCircle } from 'lucide-react';
import { CustomerReview, BusinessLocation, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
  location: BusinessLocation;
  currentLang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, location, currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section id="reviews" className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.reviews.kicker}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-display text-balance">
              {t.reviews.heading} ({location.city})
            </h2>
            <p className="mt-2 text-base text-stone-600">
              {t.reviews.subtitle}
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <div className="text-right">
              <div className="text-2xl font-bold font-mono text-stone-900 tabular-nums">{location.rating} / 5.0</div>
              <div className="text-xs text-stone-500 font-medium">{t.reviews.basedOnReviews(location.reviewCount)}</div>
            </div>
            <div className="flex text-amber-500 text-lg">
              ★★★★★
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <article
              key={rev.id}
              className="bg-stone-50/60 p-6 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500 text-sm">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono">{rev.date}</span>
                </div>

                <h3 className="text-base font-bold text-stone-900 font-display">
                  &ldquo;{rev.title}&rdquo;
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-stone-900 block">{rev.author}</span>
                  <span className="text-stone-500 text-[11px]">{rev.neighborhood}</span>
                </div>
                {rev.verifiedLocalCustomer && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                    <CheckCircle className="w-3 h-3 text-emerald-700" />
                    <span>{t.reviews.verified}</span>
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Google Maps Review Prompt */}
        <div className="mt-12 text-center p-6 bg-stone-50 rounded-2xl border border-stone-200 max-w-xl mx-auto text-xs text-stone-600">
          <p className="font-semibold text-stone-900">{t.reviews.leaveReviewTitle}</p>
          <p className="mt-1">{t.reviews.leaveReviewSubtitle}</p>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(`${location.name} ${location.city} Bangladesh`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 px-4 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg transition-colors"
          >
            {t.reviews.leaveReviewBtn}
          </a>
        </div>

      </div>
    </section>
  );
};
