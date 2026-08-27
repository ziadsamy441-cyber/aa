import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Gift } from 'lucide-react';
import { PageContainer, Button, EmptyState } from '@/components/common';
import { PageHero } from '@/components/common/PageHero';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { useCart } from '@/context/CartContext';
import { orderService } from '@/services/orderService';

function CheckoutPage() {
  const { items, totals, gift, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="animate-fade-in">
        <PageHero eyebrow="Almost There" title="Checkout" />
        <PageContainer className="py-12 lg:py-16">
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Add a few pieces to your cart before heading to checkout."
          >
            <Button
              size="lg"
              className="mt-6"
              onClick={() => navigate('/shop')}
            >
              Explore the collection
            </Button>
          </EmptyState>
        </PageContainer>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    const order = await orderService.createOrder({
      items: items.map((i) => ({
        productId: i.productId,
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total,
      shippingAddress: {
        name: '',
        line1: '',
        city: '',
        state: '',
        zip: '',
        country: '',
      },
    });
    clearCart();
    navigate(`/order-confirmation/${order.id}`);
  };

  return (
    <div className="animate-fade-in">
      <PageHero
        eyebrow="Almost There"
        title="Checkout"
        description="Review your selection and place your order. Each piece will be wrapped with care."
      />

      <PageContainer className="py-8 lg:py-12">
        <button
          onClick={() => navigate('/cart')}
          className="mb-6 inline-flex items-center gap-2 text-sm text-ink-secondary transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} />
          Back to cart
        </button>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Left: order details */}
          <div className="space-y-6">
            {/* Items review */}
            <div className="rounded-card border border-border bg-bg-surface p-6">
              <h2 className="font-serif text-lg font-medium text-ink-primary mb-4">
                Your pieces
              </h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-14 rounded-btn object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-ink-primary">
                        {item.name}
                      </p>
                      <p className="text-xs text-ink-secondary">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-ink-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gift options summary */}
            {gift.giftWrapping && (
              <div className="rounded-card border border-border bg-bg-surface p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Gift size={18} className="text-accent" strokeWidth={1.5} />
                  <h2 className="font-serif text-lg font-medium text-ink-primary">
                    Gift wrapping
                  </h2>
                </div>
                <p className="text-sm text-ink-secondary">
                  Your order will be hand-wrapped in natural kraft paper with
                  linen ribbon.
                </p>
                {gift.giftMessage && (
                  <p className="mt-3 rounded-btn bg-bg-secondary px-4 py-3 text-sm italic text-ink-secondary">
                    &ldquo;{gift.giftMessage}&rdquo;
                  </p>
                )}
              </div>
            )}

            {/* Shipping placeholder */}
            <div className="rounded-card border border-dashed border-border bg-bg-secondary/50 p-6 text-center">
              <p className="text-sm text-ink-secondary">
                Shipping address and payment details will be collected in the
                next build phase. For now, you can place a mock order to see the
                confirmation flow.
              </p>
            </div>

            <Button
              size="lg"
              fullWidth
              onClick={handlePlaceOrder}
              className="lg:hidden"
            >
              Place order
            </Button>
          </div>

          {/* Right: order summary */}
          <aside className="hidden lg:block">
            <OrderSummary onCheckout={handlePlaceOrder} />
            <p className="mt-3 text-center text-xs text-ink-secondary">
              By placing your order you agree to the studio's terms.
            </p>
          </aside>
        </div>
      </PageContainer>
    </div>
  );
}

export { CheckoutPage };
