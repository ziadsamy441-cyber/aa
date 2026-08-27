import type { ReactNode } from 'react';
import { classNames } from '@/utils/format';

type BadgeVariant = 'eco' | 'origin' | 'default' | 'accent';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  icon?: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  eco: 'bg-badge-eco text-badge-eco-text',
  origin: 'bg-badge-origin text-badge-origin-text',
  default: 'bg-bg-secondary text-ink-secondary border border-border',
  accent: 'bg-accent/10 text-accent',
};

function Badge({ children, variant = 'default', className, icon }: BadgeProps) {
  return (
    <span
      className={classNames(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}

export { Badge };
export type { BadgeProps, BadgeVariant };
