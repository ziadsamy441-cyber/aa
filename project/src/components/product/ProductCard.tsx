import { Link } from 'react-router-dom';
import { Heart, Star, Leaf, MapPin } from 'lucide-react';
import type { Product } from '@/types';
import { Badge } from '@/components/common';
import { formatCurrency, classNames } from '@/utils/format';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onToggleWishlist?: (productId: string) => void;
  isWishlisted?: boolean;
  className?: string;
}

function ProductCard({
  product,
  onToggleWishlist,
  isWishlisted,
  className,
}: ProductCardProps) {
  const wishlist = useWishlist();

  // Allow explicit prop override; otherwise use context state
  const resolvedWishlisted = isWishlisted ?? wishlist.has(product.id);
  const resolvedToggle = onToggleWishlist ?? wishlist.toggle;
  const outOfStock = product.stock <= 0;

  return (
    <div
      className={classNames(
        'group relative flex flex-col overflow-hidden rounded-card border border-border bg-bg-surface',
        'transition-all duration-300 hover:shadow-card hover:border-accent/40',
        className
      )}
    >
      {/* Image */}
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-bg-placeholder"
        aria-label={product.name}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className={classNames(
            'h-full w-full object-cover transition-transform duration-500 group-hover:scale-105',
            outOfStock && 'opacity-50'
          )}
        />
        {/* Badges overlay */}
        {product.badges.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.badges.includes('bestseller') && (
              <Badge variant="accent" className="shadow-soft">
                Bestseller
              </Badge>
            )}
            {product.badges.includes('trending') && (
              <Badge variant="eco" className="shadow-soft">
                Trending
              </Badge>
            )}
          </div>
        )}
        {/* Out of stock overlay */}
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-btn bg-bg-surface/90 px-4 py-2 text-sm font-medium text-ink-primary shadow-soft">
              Sold out
            </span>
          </div>
        )}
      </Link>

      {/* Wishlist heart */}
      <button
        onClick={(e) => {
          e.preventDefault();
          resolvedToggle(product.id);
        }}
        className={classNames(
          'absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full',
          'bg-bg-surface/90 shadow-soft transition-all duration-200',
          resolvedWishlisted
            ? 'text-red-500 hover:text-red-600'
            : 'text-ink-secondary hover:text-accent'
        )}
        aria-label={resolvedWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart
          size={18}
          strokeWidth={1.5}
          className={resolvedWishlisted ? 'fill-current' : ''}
        />
      </button>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Eco/local badges */}
        <div className="mb-2 flex items-center gap-1.5">
          {product.badges.includes('eco') && (
            <Badge variant="eco" icon={<Leaf size={10} />}>
              Eco
            </Badge>
          )}
          {product.badges.includes('local') && (
            <Badge variant="origin" icon={<MapPin size={10} />}>
              Local
            </Badge>
          )}
        </div>

        {/* Name */}
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-serif text-base font-medium leading-snug text-ink-primary transition-colors group-hover:text-accent">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < Math.round(product.rating)
                    ? 'fill-star text-star'
                    : 'text-border'
                }
              />
            ))}
          </div>
          <span className="text-xs text-ink-secondary">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price — pushed to bottom */}
        <div className="mt-auto pt-3">
          <p className="text-base font-semibold text-ink-primary">
            {formatCurrency(product.price, product.currency)}
          </p>
        </div>
      </div>
    </div>
  );
}

export { ProductCard };
export type { ProductCardProps };
