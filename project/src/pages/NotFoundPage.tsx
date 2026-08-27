import { Link } from 'react-router-dom';
import { Home as HomeIcon, ArrowLeft } from 'lucide-react';
import { PageContainer, Button } from '@/components/common';

function NotFoundPage() {
  return (
    <div className="animate-fade-in">
      <PageContainer className="py-20 lg:py-32 text-center" maxWidth="narrow">
        <p className="font-serif text-6xl font-semibold text-accent sm:text-7xl">
          404
        </p>
        <h1 className="mt-4 text-2xl font-semibold text-ink-primary sm:text-3xl">
          This page wandered off
        </h1>
        <p className="mx-auto mt-3 max-w-md text-ink-secondary">
          The page you're looking for doesn't exist or may have moved. Let's
          get you back to the studio.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link to="/">
            <Button leftIcon={<HomeIcon size={18} />}>
              Back to home
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="outline" leftIcon={<ArrowLeft size={18} />}>
              Go to shop
            </Button>
          </Link>
        </div>
      </PageContainer>
    </div>
  );
}

export { NotFoundPage };
