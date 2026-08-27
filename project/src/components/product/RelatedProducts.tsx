import type { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

function RelatedProducts({
  products,
  title = 'You may also like',
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-ink-primary">{title}</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export { RelatedProducts };
export type { RelatedProductsProps };
