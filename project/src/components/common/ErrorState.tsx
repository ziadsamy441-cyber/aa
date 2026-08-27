import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center animate-fade-in">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400">
        <AlertCircle size={28} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-semibold text-ink-primary">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-ink-secondary leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} className="mt-6" variant="outline" size="md" leftIcon={<RefreshCw size={16} />}>
          Try again
        </Button>
      )}
    </div>
  );
}

export { ErrorState };
export type { ErrorStateProps };
