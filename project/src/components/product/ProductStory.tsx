import { BookOpen, Quote } from 'lucide-react';
import type { Product } from '@/types';

interface ProductStoryProps {
  product: Product;
}

function ProductStory({ product }: ProductStoryProps) {
  return (
    <section className="border-y border-border bg-bg-secondary">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <BookOpen size={18} className="text-accent" strokeWidth={1.5} />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            The Story Behind This Piece
          </p>
        </div>

        {/* Decorative quote mark */}
        <Quote
          size={48}
          className="mx-auto mb-6 text-accent/20"
          strokeWidth={1}
        />

        {/* Story text */}
        <blockquote className="text-center">
          <p className="font-serif text-xl leading-relaxed text-ink-primary sm:text-2xl lg:text-[1.6rem] lg:leading-[1.7]">
            {product.story}
          </p>
        </blockquote>

        {/* Maker signature */}
        <div className="mt-10 flex flex-col items-center gap-1">
          <div className="h-px w-12 bg-border" />
          <p className="mt-3 font-serif text-base italic text-ink-secondary">
            Elena Marsh
          </p>
          <p className="text-xs uppercase tracking-[0.15em] text-ink-secondary">
            Maker &amp; Founder
          </p>
        </div>
      </div>
    </section>
  );
}

export { ProductStory };
export type { ProductStoryProps };
