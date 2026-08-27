import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { classNames } from '@/utils/format';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-ink-primary"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-secondary">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={classNames(
              'w-full rounded-btn border bg-bg-surface px-4 py-2.5 text-sm text-ink-primary',
              'placeholder:text-ink-secondary/60',
              'transition-colors duration-200 focus:outline-none focus:ring-2',
              'focus:ring-accent/40 focus:border-accent',
              error ? 'border-red-400 dark:border-red-500' : 'border-border',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-secondary">
              {rightIcon}
            </span>
          )}
        </div>
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

Input.displayName = 'Input';

export { Input };
export type { InputProps };
