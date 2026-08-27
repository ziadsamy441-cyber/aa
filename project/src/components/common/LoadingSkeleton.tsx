import { classNames } from '@/utils/format';

interface SkeletonProps {
  className?: string;
}

function LoadingSkeleton({ className }: SkeletonProps) {
  return <div className={classNames('skeleton rounded-btn', className)} />;
}

export { LoadingSkeleton };
export type { SkeletonProps };
