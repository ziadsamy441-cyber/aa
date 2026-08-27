import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart, GIFT_WRAPPING_FEE } from '@/context/CartContext';
import { Button } from '@/components/common';
import { formatCurrency } from '@/utils/format';

interface OrderSummaryProps {
  onCheckout?: () => void;
}

function OrderSummary({ onCheckout }: OrderSummaryProps) {
  const { totals, items, gift } = useCart();

  if (items.length === 0) return null;

  const remainingForFreeShipping = Math.max(0, 150 - totals.subtotal);
  const shippingProgress = Math.min(100, (totals.subtotal / 150) * 100);

  return (
    <div className="sticky top-24 rounded-card border border-border bg-bg-surface p-6">
      <h3 className="font-serif text-lg font-medium text-ink-primary">
        Order summary
      </h3>

      {/* Free shipping progress */}
      {remainingForFreeShipping > 0 ? (
        <div className="mt-4 rounded-btn bg-bg-secondary p-3">
          <p className="text-xs text-ink-secondary">
            Add{' '}
            <span className="font-medium text-accent">
              {formatCurrency(remainingForFreeShipping, totals.currency)}
            </span>{' '}
            more for free shipping
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg-placeholder">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-btn bg-badge-eco/50 p-3">
          <p className="text-xs font-medium text-badge-eco-text">
            You've unlocked free shipping!
          </p>
        </div>
      )}

      {/* Line items */}
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink-secondary">
            Subtotal ({totals.itemCount}{' '}
            {totals.itemCount === 1 ? 'item' : 'items'})
          </dt>
          <dd className="font-medium text-ink-primary">
            {formatCurrency(totals.subtotal, totals.currency)}
          </dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-ink-secondary">Shipping</dt>
          <dd className="font-medium text-ink-primary">
            {totals.shipping === 0 ? (
              <span className="text-accent">Free</span>
            ) : (
              formatCurrency(totals.shipping, totals.currency)
            )}
          </dd>
        </div>

        {gift.giftWrapping && (
          <div className="flex justify-between">
            <dt className="text-ink-secondary">Gift wrapping</dt>
            <dd className="font-medium text-ink-primary">
              {formatCurrency(GIFT_WRAPPING_FEE, totals.currency)}
            </dd>
          </div>
        )}
      </dl>

      {/* Total */}
      <div className="mt-5 flex justify-between border-t border-border pt-5">
        <span className="text-base font-semibold text-ink-primary">Total</span>
        <span className="text-xl font-serif font-semibold text-ink-primary">
          {formatCurrency(totals.total, totals.currency)}
        </span>
      </div>

      {gift.giftWrapping && gift.giftMessage && (
        <p className="mt-3 rounded-btn bg-bg-secondary px-3 py-2 text-xs italic text-ink-secondary">
          Gift message: &ldquo;{gift.giftMessage}&rdquo;
        </p>
      )}

      {/* Checkout button */}
      {onCheckout ? (
        <Button
          size="lg"
          fullWidth
          className="mt-6"
          rightIcon={<ArrowRight size={18} />}
          onClick={onCheckout}
        >
          Proceed to checkout
        </Button>
      ) : (
        <Link to="/checkout" className="mt-6 block">
          <Button
            size="lg"
            fullWidth
            rightIcon={<ArrowRight size={18} />}
          >
            Proceed to checkout
          </Button>
        </Link>
      )}

      <Link
        to="/shop"
        className="mt-3 flex items-center justify-center gap-2 text-sm text-ink-secondary transition-colors hover:text-accent"
      >
        <ShoppingBag size={16} strokeWidth={1.5} />
        Continue shopping
      </Link>
    </div>
  );
}

export { OrderSummary };
export type { OrderSummaryProps };
