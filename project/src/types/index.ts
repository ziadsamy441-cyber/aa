export type ProductCategory =
  | 'ceramics'
  | 'wood'
  | 'textile'
  | 'candles'
  | 'home-decor'
  | 'accessories';

export type ProductMaterial = 'clay' | 'ceramic' | 'wood' | 'fabric' | 'metal' | 'wax';

export type ProductBadge = 'eco' | 'local' | 'featured' | 'bestseller' | 'trending';

export interface ProductReview {
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  category: ProductCategory;
  material: ProductMaterial;
  description: string;
  story: string;
  images: string[];
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  stock: number;
  badges: ProductBadge[];
  featured: boolean;
  trending: boolean;
  bestSeller: boolean;
  tags: string[];
  relatedProductIds: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: ProductCategory;
  description: string;
  image?: string;
}

export interface CustomOrderRequest {
  id: string;
  name: string;
  email: string;
  category: ProductCategory;
  description: string;
  budget?: string;
  timeline?: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'declined';
  createdAt: string;
}

export interface Order {
  id: string;
  items: { productId: string; name: string; quantity: number; price: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';

export interface ShopFilters {
  search?: string;
  category?: ProductCategory | '';
  material?: ProductMaterial | '';
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
}
