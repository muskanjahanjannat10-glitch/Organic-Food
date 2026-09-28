export type Language = 'bn' | 'en';

export interface BusinessLocation {
  name: string;
  tagline: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  lat: number;
  lng: number;
  priceRange: string;
  rating: number;
  reviewCount: number;
  deliveryRadiusMiles: number;
  freeDeliveryThreshold: number;
}

export interface OperatingHours {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  nameBn?: string;
  nameEn?: string;
  slug: string;
  category: 'vegetables' | 'fruits' | 'pantry' | 'dairy';
  categoryLabel: string;
  categoryLabelBn?: string;
  categoryLabelEn?: string;
  price: number;
  unit: string;
  unitBn?: string;
  unitEn?: string;
  farmOrigin: string;
  farmOriginBn?: string;
  farmOriginEn?: string;
  distanceMiles: number;
  harvested: string;
  harvestedBn?: string;
  harvestedEn?: string;
  certified: string;
  certifiedBn?: string;
  certifiedEn?: string;
  description: string;
  descriptionBn?: string;
  descriptionEn?: string;
  nutrients: string[];
  inStock: boolean;
  bgGradient: string;
  accentColor: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  neighborhood: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedLocalCustomer: boolean;
}

export interface DeliveryZone {
  zip: string;
  neighborhood: string;
  minOrder: number;
  deliveryDays: string;
}

export interface BannerConfig {
  kicker: string;
  headlinePrefix: string;
  headlineHighlight: string;
  subheadline: string;
  promoBadge: string;
  featuredProduceTitle: string;
  featuredProduceSubtitle: string;
  featuredProducePrice: string;
  featuredEmoji: string;
  bgGradientStyle: 'dark-emerald' | 'warm-harvest' | 'deep-forest' | 'earth-terracotta';
}
