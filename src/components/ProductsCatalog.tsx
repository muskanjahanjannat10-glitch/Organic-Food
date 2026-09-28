import React, { useState } from 'react';
import { Plus, Check, Info, MapPin, Leaf, Shield, Heart } from 'lucide-react';
import { ProductItem, BusinessLocation, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ProductsCatalogProps {
  products: ProductItem[];
  location: BusinessLocation;
  currentLang: Language;
  onAddToCart: (product: ProductItem) => void;
  cartItems: { [id: string]: number };
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
}

export const ProductsCatalog: React.FC<ProductsCatalogProps> = ({
  products,
  location,
  currentLang,
  onAddToCart,
  cartItems,
  wishlistIds,
  onToggleWishlist
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const t = TRANSLATIONS[currentLang];

  const getProductName = (p: ProductItem) => {
    if (currentLang === 'bn' && p.nameBn) return p.nameBn;
    if (currentLang === 'en' && p.nameEn) return p.nameEn;
    return p.name;
  };

  const getProductDesc = (p: ProductItem) => {
    if (currentLang === 'bn' && p.descriptionBn) return p.descriptionBn;
    if (currentLang === 'en' && p.descriptionEn) return p.descriptionEn;
    return p.description;
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

  const getProductHarvest = (p: ProductItem) => {
    if (currentLang === 'bn' && p.harvestedBn) return p.harvestedBn;
    if (currentLang === 'en' && p.harvestedEn) return p.harvestedEn;
    return p.harvested;
  };

  const getProductCertified = (p: ProductItem) => {
    if (currentLang === 'bn' && p.certifiedBn) return p.certifiedBn;
    if (currentLang === 'en' && p.certifiedEn) return p.certifiedEn;
    return p.certified;
  };

  const filteredProducts = products.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const nameStr = (item.name + ' ' + (item.nameBn || '') + ' ' + (item.nameEn || '')).toLowerCase();
    const descStr = (item.description + ' ' + (item.descriptionBn || '') + ' ' + (item.descriptionEn || '')).toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = nameStr.includes(query) || descStr.includes(query) || item.farmOrigin.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

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
    <section id="products" className="py-16 md:py-24 bg-[#faf9f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-200">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
              <Leaf className="w-3.5 h-3.5" />
              <span>{t.products.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-display text-balance">
              {t.products.heading} ({location.city})
            </h2>
            <p className="mt-2 text-base text-stone-600">
              {t.products.subtitle}
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-6 md:mt-0 w-full md:w-72">
            <input
              type="text"
              placeholder={t.products.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 placeholder:text-stone-400"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {[
            { id: 'all', label: t.products.all },
            { id: 'vegetables', label: t.products.vegetables },
            { id: 'fruits', label: t.products.fruits },
            { id: 'pantry', label: t.products.pantry },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-emerald-900 text-white shadow-sm font-bold'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const countInCart = cartItems[product.id] || 0;
            const isWishlisted = wishlistIds.includes(product.id);
            const displayName = getProductName(product);
            const displayDesc = getProductDesc(product);
            const displayUnit = getProductUnit(product);
            const displayFarm = getProductFarm(product);
            const displayHarvest = getProductHarvest(product);

            return (
              <article
                key={product.id}
                className="group flex flex-col bg-white rounded-2xl border border-stone-200/80 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                {/* Visual Canvas */}
                <div className={`relative h-56 w-full bg-gradient-to-br ${product.bgGradient} flex items-center justify-center border-b border-stone-100 overflow-hidden`}>
                  
                  {/* Pattern Backdrop */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1c2e24_1px,transparent_1px)] [background-size:12px_12px]"></div>

                  {/* Botanical Center Artwork */}
                  <div className="relative text-7xl select-none transform group-hover:scale-110 transition-transform duration-300">
                    {getEmojiForProduct(product.slug)}
                  </div>

                  {/* Certified Seal Corner Tag */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-emerald-900 border border-stone-200/70 shadow-2xs flex items-center gap-1">
                    <Shield className="w-3 h-3 text-emerald-700" />
                    <span>{t.products.certified}</span>
                  </div>

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    aria-label="Toggle wishlist"
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all backdrop-blur-xs shadow-2xs ${
                      isWishlisted 
                        ? 'bg-white text-rose-500 scale-105' 
                        : 'bg-white/80 hover:bg-white text-stone-500 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                  </button>

                  {/* Harvest Distance Indicator */}
                  <div className="absolute bottom-3 right-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-300" />
                    <span>{product.distanceMiles} {t.products.kmAway}</span>
                  </div>
                </div>

                {/* Product Metadata & Purchasing Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div>
                    {/* Metadata */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1.5">
                      <span>{displayFarm}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-700">{displayHarvest}</span>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-lg font-bold text-stone-900 font-display group-hover:text-emerald-900 transition-colors">
                      {displayName}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-1.5 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {displayDesc}
                    </p>
                  </div>

                  {/* Price & Add to Pickup Bag Controls (৳ Tk) */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-stone-900 font-mono tabular-nums">
                        ৳{product.price.toFixed(0)}
                      </span>
                      <span className="text-xs text-stone-500 ml-1 font-normal">
                        {displayUnit}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        title={t.products.viewSpecs}
                        className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                        aria-label={`View details for ${displayName}`}
                      >
                        <Info className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onAddToCart(product)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                          countInCart > 0
                            ? 'bg-emerald-800 text-white shadow-xs'
                            : 'bg-stone-900 text-white hover:bg-emerald-900'
                        }`}
                      >
                        {countInCart > 0 ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{t.products.added} ({countInCart})</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>{t.products.addPickup}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 max-w-md mx-auto">
            <p className="text-base font-semibold text-stone-800">{t.products.noFound} &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-emerald-900 rounded-lg"
            >
              {t.products.reset}
            </button>
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
            <div className={`p-6 bg-gradient-to-br ${selectedProduct.bgGradient} flex items-center justify-between border-b border-stone-200`}>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{getEmojiForProduct(selectedProduct.slug)}</span>
                <div>
                  <h3 className="text-xl font-bold font-display text-stone-900">{getProductName(selectedProduct)}</h3>
                  <p className="text-xs text-emerald-800 font-medium">{getProductCertified(selectedProduct)}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-stone-500 hover:text-stone-900 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm text-stone-700">
              <div>
                <h4 className="text-xs font-semibold uppercase text-stone-400 mb-1">{t.products.modalOrigin}</h4>
                <p className="font-medium text-stone-900">{getProductFarm(selectedProduct)} ({selectedProduct.distanceMiles} {t.products.kmAway} from {location.city})</p>
                <p className="text-xs text-stone-500 mt-0.5">{t.products.modalHarvest}: {getProductHarvest(selectedProduct)}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase text-stone-400 mb-1">{t.products.modalAbout}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{getProductDesc(selectedProduct)}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase text-stone-400 mb-1.5">{t.products.modalNutrients}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.nutrients.map((n, i) => (
                    <span key={i} className="text-xs bg-stone-100 text-stone-800 px-2 py-0.5 rounded-md font-medium">
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xl font-bold font-mono tabular-nums text-stone-900">৳{selectedProduct.price.toFixed(0)}</span>
                  <span className="text-xs text-stone-500 ml-1">{getProductUnit(selectedProduct)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleWishlist(selectedProduct.id)}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      wishlistIds.includes(selectedProduct.id)
                        ? 'bg-rose-50 text-rose-600 border-rose-300'
                        : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wishlistIds.includes(selectedProduct.id) ? 'fill-rose-500' : ''}`} />
                  </button>

                  <button
                    onClick={() => { onAddToCart(selectedProduct); setSelectedProduct(null); }}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-xl"
                  >
                    {t.products.modalAddBtn}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
