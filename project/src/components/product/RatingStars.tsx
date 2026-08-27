import { Star } from 'lucide-react';
import { classNames } from '@/utils/format';

interface RatingStarsProps {
  rating: number;
  size?: number;
  className?: string;
  showValue?: boolean;
  reviewCount?: number;
}

function RatingStars({
  rating,
  size = 16,
  className,
  showValue = false,
  reviewCount,
}: RatingStarsProps) {
  return (
    <div className={classNames('flex items-center gap-2', className)}>
      <div className="flex" aria-label={`Rated ${rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const hasHalf = rating % 1 >= 0.5;
          const half = !filled && i === Math.floor(rating) && hasHalf;
          return (
            <Star
              key={i}
              size={size}
              className={classNames(
                filled || half ? 'fill-star text-star' : 'text-border'
              )}
              strokeWidth={1.5}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm text-ink-secondary">
          {rating.toFixed(1)}
          {reviewCount != null && ` (${reviewCount})`}
        </span>
      )}
    </div>
  );
}

export { RatingStars };
export type { RatingStarsProps };
