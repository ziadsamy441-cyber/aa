import type { ReactNode } from 'react';
import { PageContainer } from '@/components/common';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <div className="border-b border-border bg-bg-secondary">
      <PageContainer className="py-12 lg:py-16">
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-semibold text-ink-primary sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-secondary">
            {description}
          </p>
        )}
        {children}
      </PageContainer>
    </div>
  );
}

export { PageHero };
