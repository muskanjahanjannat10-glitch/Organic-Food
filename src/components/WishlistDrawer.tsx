import React from 'react';
import { Heart, X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { ProductItem, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: ProductItem[];
  currentLang: Language;
  onToggleWishlist: (productId: string) => void;
  onMoveToCart: (product: ProductItem) => void;
  onClearWishlist: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  currentLang,
  onToggleWishlist,
  onMoveToCart,
  onClearWishlist
}) => {
  const t = TRANSLATIONS[currentLang];

  if (!isOpen) return null;

  const wishlistedProducts = products.filter(p => wishlistIds.includes(p.id));

  const getProductName = (p: ProductItem) => {
    if (currentLang === 'bn' && p.nameBn) return p.nameBn;
    if (currentLang === 'en' && p.nameEn) return p.nameEn;
    return p.name;
  };

  const getProductUnit = (p: ProductItem) => {
    if (currentLang === 'bn' && p.unitBn) return p.unitBn;
    if (currentLang === 'en' && p.unitEn) return p.unitEn;
    return p.unit;
  };

  const getProductFarm = (p: ProductItem) => {
    if (currentLang === 'bn' && p.farmOriginBn) return p.farmOriginBn;
    if (currentLang === 'en' && p.farmOriginEn) return p.farmOriginEn;
    return p.farmOrigin;
  };

  const getEmojiForProduct = (slug: string) => {
    const s = slug.toLowerCase();
    if (s.includes('lalsak') || s.includes('palong') || s.includes('shak') || s.includes('kale')) return '🥬';
    if (s.includes('begun') || s.includes('eggplant')) return '🍆';
    if (s.includes('tomato')) return '🍅';
    if (s.includes('aam') || s.includes('mango')) return '🥭';
    if (s.includes('modhu') || s.includes('honey')) return '🍯';
    if (s.includes('tel') || s.includes('oil')) return '🫒';
    if (s.includes('ghee')) return '🧈';
    if (s.includes('dim') || s.includes('egg')) return '🥚';
    if (s.includes('chaal') || s.includes('rice') || s.includes('polao')) return '🌾';
    if (s.includes('morich') || s.includes('chili')) return '🌶️';
    if (s.includes('carrot') || s.includes('gajor')) return '🥕';
    return '🌱';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
              <div>
                <h2 className="text-base font-bold font-display">{t.wishlist.title}</h2>
                <span className="text-[11px] text-stone-400">{t.wishlist.subtitle}</span>
              </div>
              <span className="text-xs bg-rose-500/30 text-rose-200 px-2 py-0.5 rounded-full font-mono tabular-nums ml-2">
                {wishlistedProducts.length}
              </span>
            </div>
            <button onClick={onClose} className="text-stone-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <Heart className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="text-base font-semibold text-stone-800">{t.wishlist.emptyTitle}</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  {t.wishlist.emptyDesc}
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-900 rounded-xl hover:bg-emerald-800 transition-colors"
                >
                  {t.wishlist.exploreBtn}
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200 text-stone-500">
                  <span>{t.wishlist.savedCount(wishlistedProducts.length)}</span>
                  <button
                    onClick={onClearWishlist}
                    className="text-stone-500 hover:text-rose-600 transition-colors"
                  >
                    {t.wishlist.clearAll}
                  </button>
                </div>

                <div className="divide-y divide-stone-100">
                  {wishlistedProducts.map((product) => (
                    <div key={product.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-xl shrink-0">
                          {getEmojiForProduct(product.slug)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-stone-900">{getProductName(product)}</h4>
                          <span className="text-emerald-800 font-bold font-mono">৳{product.price.toFixed(0)}</span>
                          <span className="text-stone-500 ml-1">{getProductUnit(product)}</span>
                          <p className="text-[11px] text-stone-400">{getProductFarm(product)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            onMoveToCart(product);
                            onToggleWishlist(product.id);
                          }}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1"
                          title="Move to Pickup Bag"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>{t.wishlist.add}</span>
                        </button>
                        <button
                          onClick={() => onToggleWishlist(product.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Remove from wishlist"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer Action */}
          {wishlistedProducts.length > 0 && (
            <div className="p-4 bg-stone-50 border-t border-stone-200">
              <button
                onClick={() => {
                  wishlistedProducts.forEach(p => onMoveToCart(p));
                  onClearWishlist();
                }}
                className="w-full py-3 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>{t.wishlist.moveAll}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
