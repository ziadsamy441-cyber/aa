import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { PageContainer, Button, EmptyState } from '@/components/common';
import { PageHero } from '@/components/common/PageHero';
import { CartItem } from '@/components/cart/CartItem';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { GiftOptions } from '@/components/cart/GiftOptions';
import { useCart } from '@/context/CartContext';

function CartPage() {
  const { items, totals, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="animate-fade-in">
        <PageHero eyebrow="Your Selection" title="Cart" />
        <PageContainer className="py-12 lg:py-16">
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="You haven't added any pieces yet. Explore the collection to find something you'll love for years to come."
          >
            <Link to="/shop" className="mt-6 inline-block">
              <Button size="lg" rightIcon={<ArrowRight size={18} />}>
                Explore the collection
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
        eyebrow="Your Selection"
        title="Cart"
        description={`${totals.itemCount} ${
          totals.itemCount === 1 ? 'piece' : 'pieces'
        } chosen from the studio`}
      />

      <PageContainer className="py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Left: cart items + gift options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-medium text-ink-primary">
                {totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'}
              </h2>
              <button
                onClick={clearCart}
                className="flex items-center gap-1.5 text-sm text-ink-secondary transition-colors hover:text-red-500"
              >
                <Trash2 size={15} strokeWidth={1.5} />
                Clear cart
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <CartItem key={item.productId} item={item} />
              ))}
            </div>

            <GiftOptions className="mt-6" />

            {/* Mobile summary */}
            <div className="lg:hidden">
              <OrderSummary onCheckout={() => navigate('/checkout')} />
            </div>
          </div>

          {/* Right: order summary (desktop) */}
          <aside className="hidden lg:block">
            <OrderSummary onCheckout={() => navigate('/checkout')} />
          </aside>
        </div>
      </PageContainer>
    </div>
  );
}

export { CartPage };
