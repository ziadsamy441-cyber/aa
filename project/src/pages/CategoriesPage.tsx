import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageContainer, Button, LoadingSkeleton } from '@/components/common';
import { PageHero } from '@/components/common/PageHero';
import { productService } from '@/services/productService';
import type { Category } from '@/types';

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productCounts, setProductCounts] = useState<Record<string, number>>(
    {}
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([productService.getCategories(), productService.getAll()]).then(
      ([cats, prods]) => {
        setCategories(cats);
        const counts: Record<string, number> = {};
        for (const cat of cats) {
          counts[cat.slug] = prods.filter((p) => p.category === cat.slug).length;
        }
        setProductCounts(counts);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="animate-fade-in">
      <PageHero
        eyebrow="Browse by Craft"
        title="Categories"
        description="Explore the studio's work by material and craft — from hand-thrown ceramics to naturally dyed textiles. Six crafts, one pair of hands."
      />

      {/* Editorial intro paragraph */}
      <PageContainer className="py-10 lg:py-14" maxWidth="narrow">
        <p className="text-center font-serif text-lg italic leading-relaxed text-ink-secondary sm:text-xl">
          Each category is a different conversation between maker and material.
          Clay speaks of fire and patience. Wood of grain and time. Fabric of
          dye and stitch. Choose the one that feels right for your home.
        </p>
      </PageContainer>

      <PageContainer className="pb-16 lg:pb-20">
        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-card border border-border bg-bg-surface"
              >
                <LoadingSkeleton className="aspect-[16/10]" />
                <div className="p-7">
                  <LoadingSkeleton className="h-6 w-32 mb-3" />
                  <LoadingSkeleton className="h-4 w-full mb-1" />
                  <LoadingSkeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, index) => (
              <Link
                key={cat.id}
                id={cat.slug}
                to={`/shop?category=${cat.slug}`}
                className="group flex flex-col overflow-hidden rounded-card border border-border bg-bg-surface transition-all duration-300 hover:shadow-lift hover:border-accent/40 scroll-mt-24 animate-slide-up"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {cat.image && (
                  <div className="relative block aspect-[16/10] overflow-hidden bg-bg-placeholder">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay gradient for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 left-3 rounded-full bg-bg-surface/90 px-3 py-1 text-xs font-medium text-ink-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {productCounts[cat.slug] ?? 0} pieces
                    </div>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                      0{index + 1}
                    </span>
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <h2 className="mt-3 font-serif text-xl font-medium text-ink-primary transition-colors group-hover:text-accent">
                    {cat.name}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-secondary">
                    {cat.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs text-ink-secondary">
                      {productCounts[cat.slug] ?? 0}{' '}
                      {(productCounts[cat.slug] ?? 0) === 1 ? 'piece' : 'pieces'}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-accent transition-all group-hover:gap-2">
                      Browse
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="font-serif text-lg text-ink-secondary">
            Can't decide where to start?
          </p>
          <Link to="/shop" className="inline-block mt-4">
            <Button size="lg" rightIcon={<ArrowRight size={18} />}>
              Browse all pieces
            </Button>
          </Link>
        </div>
      </PageContainer>
    </div>
  );
}

export { CategoriesPage };
