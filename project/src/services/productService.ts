import type { Product, Category, ShopFilters, SortOption } from '@/types';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';

const products = productsData as Product[];
const categories = categoriesData as Category[];

// Mock async helpers — simulating latency for future Spring Boot integration.
// When the Spring Boot REST API is ready, replace the internals of each method
// with fetch calls to the corresponding endpoints. The signatures should stay
// the same so UI components don't need to change.
function delay<T>(data: T, ms = 150): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

function sortBy(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      // Mock: reverse of data order simulates newest-first
      return sorted.reverse();
    case 'featured':
    default:
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }
}

function applyFilters(products: Product[], filters: ShopFilters): Product[] {
  let result = [...products];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.material) {
    result = result.filter((p) => p.material === filters.material);
  }

  if (filters.minPrice != null) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice != null) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters.sort) {
    result = sortBy(result, filters.sort);
  } else {
    result = sortBy(result, 'featured');
  }

  return result;
}

export const productService = {
  async getAll(): Promise<Product[]> {
    return delay([...products]);
  },

  async getFiltered(filters: ShopFilters): Promise<Product[]> {
    return delay(applyFilters(products, filters));
  },

  async getFeatured(): Promise<Product[]> {
    return delay(products.filter((p) => p.featured));
  },

  async getTrending(): Promise<Product[]> {
    return delay(products.filter((p) => p.trending));
  },

  async getBestSellers(): Promise<Product[]> {
    return delay(products.filter((p) => p.bestSeller));
  },

  async getById(id: string): Promise<Product | null> {
    return delay(products.find((p) => p.id === id || p.slug === id) ?? null);
  },

  async getBySlug(slug: string): Promise<Product | null> {
    return delay(products.find((p) => p.slug === slug) ?? null);
  },

  async getByCategory(slug: string): Promise<Product[]> {
    return delay(products.filter((p) => p.category === slug));
  },

  async getRelated(productId: string): Promise<Product[]> {
    const product = products.find((p) => p.id === productId);
    if (!product) return delay([]);
    return delay(
      product.relatedProductIds
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => p != null)
    );
  },

  async search(query: string): Promise<Product[]> {
    const q = query.toLowerCase();
    return delay(
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    );
  },

  async getCategories(): Promise<Category[]> {
    return delay([...categories]);
  },

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return delay(categories.find((c) => c.slug === slug) ?? null);
  },

  async getAllMaterials(): Promise<string[]> {
    const materials = [...new Set(products.map((p) => p.material))];
    return delay(materials);
  },
};
