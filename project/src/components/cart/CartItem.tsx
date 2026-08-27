import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';
import type { CartItem as CartItemType } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';
import { formatCurrency, classNames } from '@/utils/format';

interface CartItemProps {
  item: CartItemType;
}

function CartItem({ item }: CartItemProps) {
  const { increaseQuantity, decreaseQuantity, removeItem, setQuantity } =
    useCart();

  const lineTotal = item.price * item.quantity;
  const atStockLimit = item.quantity >= item.stock;

  return (
    <div className="flex gap-4 rounded-card border border-border bg-bg-surface p-4 transition-shadow hover:shadow-soft sm:p-5">
      {/* Image */}
      <Link
        to={`/product/${item.slug}`}
        className="shrink-0 overflow-hidden rounded-btn bg-bg-placeholder"
      >
        <img
          src={item.image}
          alt={item.name}
          className="h-24 w-20 object-cover sm:h-28 sm:w-24"
          loading="lazy"
        />
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link
            to={`/product/${item.slug}`}
            className="font-serif text-base font-medium leading-snug text-ink-primary transition-colors hover:text-accent"
          >
            {item.name}
          </Link>
          <button
            onClick={() => removeItem(item.productId)}
            className="shrink-0 rounded-btn p-1.5 text-ink-secondary transition-colors hover:bg-bg-secondary hover:text-red-500"
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash2 size={18} strokeWidth={1.5} />
          </button>
        </div>

        <p className="mt-1 text-sm text-ink-secondary">
          {formatCurrency(item.price, item.currency)} each
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          {/* Quantity selector */}
          <div className="flex items-center gap-1 rounded-btn border border-border bg-bg-surface">
            <button
              onClick={() => decreaseQuantity(item.productId)}
              className="flex h-8 w-8 items-center justify-center text-ink-primary transition-colors hover:bg-bg-secondary disabled:opacity-40"
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={14} strokeWidth={2} />
            </button>
            <input
              type="number"
              min={1}
              max={item.stock}
              value={item.quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val)) {
                  setQuantity(item.productId, val);
                }
              }}
              className="w-10 border-none bg-transparent text-center text-sm font-medium text-ink-primary focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              aria-label="Quantity"
            />
            <button
              onClick={() => increaseQuantity(item.productId)}
              className={classNames(
                'flex h-8 w-8 items-center justify-center text-ink-primary transition-colors hover:bg-bg-secondary disabled:opacity-40'
              )}
              disabled={atStockLimit}
              aria-label="Increase quantity"
            >
              <Plus size={14} strokeWidth={2} />
            </button>
          </div>

          {/* Line total */}
          <div className="text-right">
            <p className="text-sm font-semibold text-ink-primary">
              {formatCurrency(lineTotal, item.currency)}
            </p>
            {atStockLimit && (
              <p className="mt-0.5 text-[10px] text-ink-secondary">
                Max {item.stock} available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { CartItem };
export type { CartItemProps };
