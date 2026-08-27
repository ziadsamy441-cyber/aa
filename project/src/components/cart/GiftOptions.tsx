import { useState } from 'react';
import { Gift, MessageSquare } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency, classNames } from '@/utils/format';

interface GiftOptionsProps {
  className?: string;
}

function GiftOptions({ className }: GiftOptionsProps) {
  const { gift, toggleGiftWrapping, setGiftMessage, items } = useCart();
  const [messageOpen, setMessageOpen] = useState(gift.giftWrapping);

  if (items.length === 0) return null;

  return (
    <div
      className={classNames(
        'rounded-card border border-border bg-bg-surface p-5',
        className
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <Gift size={18} className="text-accent" strokeWidth={1.5} />
        <h3 className="font-serif text-base font-medium text-ink-primary">
          Gift options
        </h3>
      </div>

      {/* Gift wrapping checkbox */}
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={gift.giftWrapping}
          onChange={(e) => {
            toggleGiftWrapping();
            setMessageOpen(e.target.checked);
          }}
          className="mt-0.5 h-4 w-4 rounded accent-accent text-accent"
        />
        <div>
          <span className="text-sm font-medium text-ink-primary">
            Add gift wrapping
          </span>
          <p className="text-xs text-ink-secondary">
            Hand-wrapped in natural kraft paper with linen ribbon. +$8.00
          </p>
        </div>
      </label>

      {/* Gift message */}
      {messageOpen && (
        <div className="mt-4 animate-slide-up">
          <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink-primary">
            <MessageSquare size={14} className="text-accent" strokeWidth={1.5} />
            Gift message
          </label>
          <textarea
            value={gift.giftMessage}
            onChange={(e) => setGiftMessage(e.target.value)}
            placeholder="Write a personal note to include with the gift..."
            rows={3}
            maxLength={300}
            className="w-full resize-y rounded-btn border border-border bg-bg-surface px-4 py-2.5 text-sm text-ink-primary placeholder:text-ink-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
          />
          <p className="mt-1 text-right text-xs text-ink-secondary">
            {gift.giftMessage.length}/300
          </p>
        </div>
      )}
    </div>
  );
}

export { GiftOptions };
export type { GiftOptionsProps };
