import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package } from 'lucide-react';
import { PageContainer, Button } from '@/components/common';

function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className="animate-fade-in">
      <PageContainer className="py-16 lg:py-24" maxWidth="narrow">
        <div className="rounded-card border border-border bg-bg-surface p-8 text-center lg:p-12">
          <CheckCircle2
            size={56}
            strokeWidth={1}
            className="mx-auto text-accent mb-5"
          />
          <h1 className="text-2xl font-semibold text-ink-primary sm:text-3xl">
            Thank you for your order
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
            Your order has been received and will be made with care. A
            confirmation has been sent to your email.
          </p>
          {orderId && (
            <p className="mt-5 inline-block rounded-btn bg-bg-secondary px-4 py-2 text-sm font-medium text-ink-primary">
              Order #{orderId}
            </p>
          )}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link to="/shop">
              <Button leftIcon={<Package size={18} />}>
                Continue shopping
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline">
                Back to home
              </Button>
            </Link>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

export { OrderConfirmationPage };
