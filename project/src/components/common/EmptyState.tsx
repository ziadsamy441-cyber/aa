import type { ReactNode } from 'react';
import { PackageOpen, type LucideIcon } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: LucideIcon;
  children?: ReactNode;
}

function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = PackageOpen,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center animate-fade-in">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-bg-secondary text-ink-secondary">
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-semibold text-ink-primary">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-ink-secondary leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-6" size="md">
          {actionLabel}
        </Button>
      )}
      {children}
    </div>
  );
}

export { EmptyState };
export type { EmptyStateProps };
