import type { Product, ProductReview } from '@/types';
import { RatingStars } from './RatingStars';
import { formatDate } from '@/utils/format';

interface ReviewsSectionProps {
  product: Product;
}

interface ReviewCardProps {
  review: ProductReview;
}

function getRatingDistribution(reviews: ProductReview[]): number[] {
  const dist = [0, 0, 0, 0, 0];
  for (const r of reviews) {
    const idx = Math.min(4, Math.max(0, Math.round(r.rating) - 1));
    dist[idx]++;
  }
  return dist;
}

function ReviewSummary({
  rating,
  reviewCount,
  reviews,
}: {
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
}) {
  const distribution = getRatingDistribution(reviews);

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
      {/* Overall score */}
      <div className="flex flex-col items-center sm:items-start shrink-0">
        <p className="text-5xl font-serif font-semibold text-ink-primary">
          {rating.toFixed(1)}
        </p>
        <div className="mt-2">
          <RatingStars rating={rating} size={18} />
        </div>
        <p className="mt-2 text-sm text-ink-secondary">
          Based on {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
        </p>
      </div>

      {/* Distribution bars */}
      <div className="flex-1 w-full space-y-2">
        {distribution.map((count, i) => {
          const stars = 5 - i;
          const percent =
            reviewCount > 0 ? (count / reviews.length) * 100 : 0;
          return (
            <div key={stars} className="flex items-center gap-3">
              <span className="flex w-12 shrink-0 items-center gap-1 text-xs text-ink-secondary">
                {stars}
                <span className="text-ink-secondary">★</span>
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-bg-secondary">
                <div
                  className="h-full rounded-full bg-star transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="w-8 shrink-0 text-right text-xs text-ink-secondary">
                {count}
              </span>
            </div>
          );
        }).reverse()}
      </div>
    </div>
  );
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-card border border-border bg-bg-surface p-5 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-secondary text-sm font-medium text-ink-primary">
            {review.author.charAt(0)}
          </span>
          <div>
            <p className="text-sm font-medium text-ink-primary">
              {review.author}
            </p>
            <p className="text-xs text-ink-secondary">
              {formatDate(review.date)}
            </p>
          </div>
        </div>
        <RatingStars rating={review.rating} size={14} />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
        {review.comment}
      </p>
    </div>
  );
}

function ReviewsSection({ product }: ReviewsSectionProps) {
  if (product.reviews.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-ink-primary">Reviews</h2>
        <p className="mt-4 text-sm text-ink-secondary">
          No reviews yet. Be the first to share your experience.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-ink-primary">
        Reviews ({product.reviewCount})
      </h2>

      {/* Summary */}
      <div className="mt-6 rounded-card border border-border bg-bg-secondary p-6">
        <ReviewSummary
          rating={product.rating}
          reviewCount={product.reviewCount}
          reviews={product.reviews}
        />
      </div>

      {/* Individual reviews */}
      <div className="mt-6 space-y-4">
        {product.reviews.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
    </div>
  );
}

export { ReviewsSection, ReviewCard, ReviewSummary };
export type { ReviewsSectionProps, ReviewCardProps };
