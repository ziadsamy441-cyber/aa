import type { ReactNode } from 'react';
import { classNames } from '@/utils/format';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'default' | 'narrow' | 'wide';
}

const maxWidthClasses = {
  narrow: 'max-w-2xl',
  default: 'max-w-page',
  wide: 'max-w-7xl',
};

function PageContainer({
  children,
  className,
  maxWidth = 'default',
}: PageContainerProps) {
  return (
    <div
      className={classNames(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </div>
  );
}

export { PageContainer };
export type { PageContainerProps };
