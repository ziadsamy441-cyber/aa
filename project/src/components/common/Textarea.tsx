import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { classNames } from '@/utils/format';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const textareaId = id || props.name;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-1.5 block text-sm font-medium text-ink-primary"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={classNames(
            'w-full rounded-btn border bg-bg-surface px-4 py-2.5 text-sm text-ink-primary',
            'placeholder:text-ink-secondary/60 resize-y min-h-[100px]',
            'transition-colors duration-200 focus:outline-none focus:ring-2',
            'focus:ring-accent/40 focus:border-accent',
            error ? 'border-red-400 dark:border-red-500' : 'border-border',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-1 text-xs text-ink-secondary">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
export type { TextareaProps };
