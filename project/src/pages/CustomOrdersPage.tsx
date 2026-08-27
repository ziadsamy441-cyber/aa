import { PageContainer } from '@/components/common';
import { PageHero } from '@/components/common/PageHero';
import { CustomOrderForm } from '@/components/maker/CustomOrderForm';

function CustomOrdersPage() {
  return (
    <div className="animate-fade-in">
      <PageHero
        eyebrow="Bespoke"
        title="Custom Orders"
        description="Commission a one-of-a-kind piece made just for you. Share your vision and the maker will respond personally."
      />
      <PageContainer className="py-12 lg:py-16" maxWidth="narrow">
        <CustomOrderForm />
      </PageContainer>
    </div>
  );
}

export { CustomOrdersPage };
