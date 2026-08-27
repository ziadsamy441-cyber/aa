import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import {
  PageContainer,
  LoadingSkeleton,
  EmptyState,
  Select,
} from '@/components/common';
import { PageHero } from '@/components/common/PageHero';
import { ProductCard } from '@/components/product/ProductCard';
import { FilterSidebar } from '@/components/product/FilterSidebar';
import { productService } from '@/services/productService';
import type { Product, Category, SortOption } from '@/types';
import { classNames } from '@/utils/format';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const PRICE_BOUNDS: [number, number] = [0, 200];

function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceInput, setPriceInput] = useState<[number, number]>(PRICE_BOUNDS);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Read filter state from URL
  const search = searchParams.get('search') ?? '';
  const category = searchParams.get('category') ?? '';
  const material = searchParams.get('material') ?? '';
  const sort = (searchParams.get('sort') as SortOption) ?? 'featured';
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  const appliedPriceRange: [number, number] = [
    minPrice ? Number(minPrice) : PRICE_BOUNDS[0],
    maxPrice ? Number(maxPrice) : PRICE_BOUNDS[1],
  ];

  const materials = useMemo(
    () => [
      { value: 'clay' as const, label: 'Clay' },
      { value: 'ceramic' as const, label: 'Ceramic' },
      { value: 'wood' as const, label: 'Wood' },
      { value: 'fabric' as const, label: 'Fabric' },
      { value: 'metal' as const, label: 'Metal' },
      { value: 'wax' as const, label: 'Wax' },
    ],
    []
  );

  // Update URL helper
  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const next = new URLSearchParams(searchParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '') {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      });
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const handleCategoryChange = (cat: string) => {
    updateParams({ category: cat || null });
    setMobileFiltersOpen(false);
  };

  const handleMaterialChange = (mat: string) => {
    updateParams({ material: mat || null });
    setMobileFiltersOpen(false);
  };

  const handlePriceApply = () => {
    updateParams({
      minPrice: priceInput[0] > 0 ? String(priceInput[0]) : null,
      maxPrice: priceInput[1] < 200 ? String(priceInput[1]) : null,
    });
  };

  const handleSortChange = (value: string) => {
    updateParams({ sort: value });
  };

  const handleClearAll = () => {
    setSearchParams({}, { replace: true });
    setPriceInput(PRICE_BOUNDS);
    setMobileFiltersOpen(false);
  };

  // Fetch products when filters change
  useEffect(() => {
    let active = true;
    setLoading(true);
    productService
      .getFiltered({
        search: search || undefined,
        category: (category as Product['category']) || undefined,
        material: (material as Product['material']) || undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        sort,
      })
      .then((data) => {
        if (active) {
          setProducts(data);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [search, category, material, minPrice, maxPrice, sort]);

  // Fetch categories
  useEffect(() => {
    productService.getCategories().then(setCategories);
  }, []);

  const hasActiveFilters =
    search !== '' ||
    category !== '' ||
    material !== '' ||
    minPrice !== null ||
    maxPrice !== null;

  return (
    <div className="animate-fade-in">
      <PageHero
        eyebrow="The Shop"
        title="All Pieces"
        description="Browse the full collection of handmade ceramics, textiles, wood decor, candles, and accessories. Each piece is made by a single artisan."
      />

      <PageContainer className="py-8 lg:py-12">
        {/* Search bar */}
        <div className="mb-6">
          <div className="relative max-w-xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-secondary"
            />
            <input
              type="text"
              defaultValue={search}
              key={search}
              placeholder="Search pieces, materials, tags..."
              onChange={(e) => {
                const value = e.target.value;
                if (searchTimer.current) clearTimeout(searchTimer.current);
                searchTimer.current = setTimeout(
                  () => updateParams({ search: value || null }),
                  350
                );
              }}
              className="w-full rounded-btn border border-border bg-bg-surface py-2.5 pl-11 pr-10 text-sm text-ink-primary placeholder:text-ink-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
            />
            {search && (
              <button
                onClick={() => updateParams({ search: null })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-secondary hover:text-ink-primary"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Toolbar: count + sort + mobile filter button */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-ink-secondary">
            {loading ? (
              'Loading...'
            ) : (
              <>
                <span className="font-medium text-ink-primary">
                  {products.length}
                </span>{' '}
                {products.length === 1 ? 'piece' : 'pieces'}
                {search && (
                  <>
                    {' '}for &ldquo;<span className="text-ink-primary">{search}</span>&rdquo;
                  </>
                )}
              </>
            )}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-btn border border-border bg-bg-surface px-4 py-2 text-sm font-medium text-ink-primary transition-colors hover:bg-bg-secondary lg:hidden"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
            <div className="w-40 sm:w-48">
              <Select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                options={sortOptions}
                aria-label="Sort by"
              />
            </div>
          </div>
        </div>

        {/* Main layout: sidebar + grid */}
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-24">
              <FilterSidebar
                categories={categories.map((c) => ({ slug: c.slug, name: c.name }))}
                materials={materials}
                selectedCategory={category}
                selectedMaterial={material}
                priceRange={priceInput}
                appliedPriceRange={appliedPriceRange}
                onCategoryChange={handleCategoryChange}
                onMaterialChange={handleMaterialChange}
                onPriceChange={setPriceInput}
                onApplyPrice={handlePriceApply}
                onClearAll={handleClearAll}
              />
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-card border border-border bg-bg-surface overflow-hidden"
                  >
                    <LoadingSkeleton className="aspect-[4/5]" />
                    <div className="p-4 space-y-2">
                      <LoadingSkeleton className="h-4 w-20" />
                      <LoadingSkeleton className="h-5 w-full" />
                      <LoadingSkeleton className="h-4 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <EmptyState
                title="No pieces found"
                description={
                  hasActiveFilters
                    ? "Nothing matches your current filters. Try adjusting your search or clearing some filters."
                    : "The studio is currently empty. Please check back soon."
                }
                icon={Search}
                actionLabel={hasActiveFilters ? 'Clear all filters' : undefined}
                onAction={hasActiveFilters ? handleClearAll : undefined}
              />
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </PageContainer>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 animate-fade-in"
            onClick={() => setMobileFiltersOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-bg-surface shadow-lift animate-slide-in-right overflow-y-auto">
            <div className="p-5">
              <FilterSidebar
                categories={categories.map((c) => ({ slug: c.slug, name: c.name }))}
                materials={materials}
                selectedCategory={category}
                selectedMaterial={material}
                priceRange={priceInput}
                appliedPriceRange={appliedPriceRange}
                onCategoryChange={handleCategoryChange}
                onMaterialChange={handleMaterialChange}
                onPriceChange={setPriceInput}
                onApplyPrice={handlePriceApply}
                onClearAll={handleClearAll}
                isMobile
                onClose={() => setMobileFiltersOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { ShopPage };
