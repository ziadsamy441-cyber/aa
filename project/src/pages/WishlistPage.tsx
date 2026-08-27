import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingBag, Trash2 } from 'lucide-react';
import { PageContainer, Button, EmptyState } from '@/components/common';
import { PageHero } from '@/components/common/PageHero';
import { ProductCard } from '@/components/product/ProductCard';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { productService } from '@/services/productService';
import type { Product } from '@/types';

function WishlistPage() {
  const { ids, remove, count, clear } = useWishlist();
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    if (ids.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all(ids.map((id) => productService.getById(id))).then((results) => {
      if (!active) return;
      const valid = results.filter((p): p is Product => p !== null);
      setProducts(valid);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [ids]);

  if (count === 0) {
    return (
      <div className="animate-fade-in">
        <PageHero eyebrow="Saved for Later" title="Wishlist" />
        <PageContainer className="py-12 lg:py-16">
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            description="Save pieces you love by tapping the heart icon on any product. Your wishlist stays with you across visits."
          >
            <Link to="/shop" className="mt-6 inline-block">
              <Button size="lg" rightIcon={<ArrowRight size={18} />}>
                Discover pieces
              </Button>
            </Link>
          </EmptyState>
        </PageContainer>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <PageHero
        eyebrow="Saved for Later"
        title="Wishlist"
        description={`${count} ${count === 1 ? 'piece' : 'pieces'} you've fallen for`}
      />

      <PageContainer className="py-8 lg:py-12">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-ink-secondary">
            <span className="font-medium text-ink-primary">{count}</span>{' '}
            {count === 1 ? 'item' : 'items'} saved
          </p>
          <button
            onClick={clear}
            className="flex items-center gap-1.5 text-sm text-ink-secondary transition-colors hover:text-red-500"
          >
            <Trash2 size={15} strokeWidth={1.5} />
            Clear wishlist
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: Math.min(count, 4) }).map((_, i) => (
              <div
                key={i}
                className="rounded-card border border-border bg-bg-surface overflow-hidden"
              >
                <div className="skeleton aspect-[4/5]" />
                <div className="space-y-2 p-4">
                  <div className="skeleton h-4 w-20 rounded-btn" />
                  <div className="skeleton h-5 w-full rounded-btn" />
                  <div className="skeleton h-4 w-16 rounded-btn" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
              const outOfStock = product.stock <= 0;
              return (
                <div key={product.id} className="relative group">
                  <ProductCard
                    product={product}
                    isWishlisted={true}
                    onToggleWishlist={() => remove(product.id)}
                  />
                  {/* Action overlay buttons */}
                  <div className="mt-3 flex gap-2">
                    {!outOfStock && (
                      <Button
                        size="sm"
                        fullWidth
                        leftIcon={<ShoppingBag size={15} />}
                        onClick={() => addItem(product)}
                      >
                        Add to cart
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => remove(product.id)}
                      leftIcon={<Trash2 size={15} />}
                      className="shrink-0"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Some IDs may not have resolved (deleted products) */}
        {!loading && products.length < ids.length && (
          <p className="mt-6 text-center text-sm text-ink-secondary">
            {ids.length - products.length}{' '}
            {ids.length - products.length === 1 ? 'piece' : 'pieces'} no longer
            available
          </p>
        )}

        <div className="mt-10 text-center">
          <Link to="/shop">
            <Button variant="outline" rightIcon={<ArrowRight size={16} />}>
              Continue browsing
            </Button>
          </Link>
        </div>
      </PageContainer>
    </div>
  );
}

export { WishlistPage };
