import { useState } from 'react';
import {
  ShoppingBag,
  Heart,
  Bell,
  Check,
  Package,
} from 'lucide-react';
import type { Product } from '@/types';
import { Button, Input, Modal } from '@/components/common';
import { RatingStars } from './RatingStars';
import { ProductBadges } from './ProductBadges';
import { formatCurrency, classNames } from '@/utils/format';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductInfoProps {
  product: Product;
}

function ProductInfo({ product }: ProductInfoProps) {
  const outOfStock = product.stock <= 0;
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [notifySubmitted, setNotifySubmitted] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifyError, setNotifyError] = useState('');

  const { addItem, getQuantity, isInCart } = useCart();
  const { has, toggleWithProduct } = useWishlist();

  const wishlisted = has(product.id);
  const cartQty = getQuantity(product.id);
  const inCart = isInCart(product.id);

  const maxAddable = outOfStock ? 0 : product.stock - cartQty;
  const effectiveMax = Math.min(quantity, Math.max(1, maxAddable));

  const handleAddToCart = () => {
    if (outOfStock || maxAddable <= 0) return;
    addItem(product, Math.min(quantity, maxAddable));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleWishlist = () => {
    toggleWithProduct(product);
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setNotifyError('Please enter a valid email');
      return;
    }
    setNotifyError('');
    setNotifySubmitted(true);
  };

  const handleCloseNotify = () => {
    setNotifyOpen(false);
    setTimeout(() => {
      setNotifySubmitted(false);
      setNotifyEmail('');
      setNotifyError('');
    }, 300);
  };

  return (
    <div className="flex flex-col">
      {/* Badges */}
      <ProductBadges badges={product.badges} />

      {/* Name */}
      <h1 className="mt-3 text-3xl font-semibold text-ink-primary sm:text-4xl">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="mt-3">
        <RatingStars
          rating={product.rating}
          size={16}
          showValue
          reviewCount={product.reviewCount}
        />
      </div>

      {/* Description */}
      <p className="mt-5 text-lg leading-relaxed text-ink-secondary">
        {product.description}
      </p>

      {/* Material + category */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-btn border border-border bg-bg-surface px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-secondary">
            Material
          </p>
          <p className="mt-1 text-sm capitalize text-ink-primary">
            {product.material}
          </p>
        </div>
        <div className="rounded-btn border border-border bg-bg-surface px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-secondary">
            Category
          </p>
          <p className="mt-1 text-sm capitalize text-ink-primary">
            {product.category.replace(/-/g, ' ')}
          </p>
        </div>
      </div>

      {/* Tags */}
      {product.tags.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-1.5">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-bg-secondary px-2.5 py-1 text-xs text-ink-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Price + availability + actions */}
      <div className="mt-8 border-t border-border pt-6">
        <p className="text-2xl font-semibold text-ink-primary">
          {formatCurrency(product.price, product.currency)}
        </p>

        {/* Availability */}
        <div className="mt-2 flex items-center gap-2">
          <Package
            size={16}
            className={outOfStock ? 'text-red-500' : 'text-accent'}
            strokeWidth={1.5}
          />
          <p
            className={classNames(
              'text-sm font-medium',
              outOfStock ? 'text-red-500' : 'text-accent'
            )}
          >
            {outOfStock
              ? 'Currently sold out'
              : `In stock — ${product.stock} available`}
          </p>
        </div>

        {/* Already in cart indicator */}
        {inCart && !outOfStock && (
          <div className="mt-3 flex items-center gap-2 text-sm text-accent animate-slide-up">
            <Check size={16} />
            <span>{cartQty} in your cart</span>
          </div>
        )}

        {/* Quantity selector (only if in stock) */}
        {!outOfStock && (
          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-medium text-ink-primary">
              Quantity
            </label>
            <div className="flex items-center gap-1 w-fit rounded-btn border border-border bg-bg-surface">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center text-ink-primary transition-colors hover:bg-bg-secondary rounded-l-btn disabled:opacity-40"
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <span className="text-lg">−</span>
              </button>
              <span className="w-10 text-center text-sm font-medium text-ink-primary">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                className="flex h-10 w-10 items-center justify-center text-ink-primary transition-colors hover:bg-bg-secondary rounded-r-btn disabled:opacity-40"
                disabled={quantity >= product.stock}
                aria-label="Increase quantity"
              >
                <span className="text-lg">+</span>
              </button>
            </div>
            {maxAddable < quantity && maxAddable > 0 && (
              <p className="mt-1.5 text-xs text-ink-secondary">
                {cartQty} already in cart — {maxAddable} more available
              </p>
            )}
            {maxAddable === 0 && (
              <p className="mt-1.5 text-xs text-ink-secondary">
                All {product.stock} available are in your cart
              </p>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-5 flex flex-wrap gap-3">
          {outOfStock ? (
            <Button
              size="lg"
              variant="secondary"
              leftIcon={<Bell size={18} />}
              onClick={() => setNotifyOpen(true)}
            >
              Notify Me
            </Button>
          ) : (
            <Button
              size="lg"
              leftIcon={
                addedToCart ? <Check size={18} /> : <ShoppingBag size={18} />
              }
              onClick={handleAddToCart}
              disabled={maxAddable <= 0}
              className={classNames(
                addedToCart && 'bg-accent/80 transition-colors'
              )}
            >
              {addedToCart
                ? 'Added to cart'
                : maxAddable <= 0
                  ? 'All in cart'
                  : 'Add to cart'}
            </Button>
          )}

          <Button
            variant="outline"
            size="lg"
            leftIcon={
              <Heart
                size={18}
                className={wishlisted ? 'fill-red-500 text-red-500' : ''}
              />
            }
            onClick={handleWishlist}
            className={classNames(
              wishlisted && 'border-red-400 text-red-500 hover:text-red-600'
            )}
          >
            {wishlisted ? 'Saved' : 'Wishlist'}
          </Button>
        </div>

        {/* Added to cart feedback */}
        {addedToCart && (
          <div className="mt-3 flex items-center gap-2 text-sm text-accent animate-slide-up">
            <Check size={16} />
            <span>Added {Math.min(quantity, maxAddable)} to your cart</span>
          </div>
        )}
      </div>

      {/* Notify Me modal */}
      <Modal
        open={notifyOpen}
        onClose={handleCloseNotify}
        title={notifySubmitted ? undefined : 'Notify Me'}
        size="sm"
      >
        {notifySubmitted ? (
          <div className="text-center py-4 animate-fade-in">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Check size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-ink-primary">
              You're on the list
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
              We'll let you know by email if this piece comes back in stock.
              Thank you for your interest.
            </p>
            <Button className="mt-6" onClick={handleCloseNotify}>
              Done
            </Button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <p className="mb-4 text-sm text-ink-secondary">
              Enter your email and we'll notify you when{' '}
              <span className="font-medium text-ink-primary">
                {product.name}
              </span>{' '}
              becomes available again.
            </p>
            <form onSubmit={handleNotifySubmit} className="space-y-4">
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                error={notifyError || undefined}
                autoFocus
              />
              <Button type="submit" fullWidth size="lg" leftIcon={<Bell size={18} />}>
                Notify me
              </Button>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
}

export { ProductInfo };
export type { ProductInfoProps };
