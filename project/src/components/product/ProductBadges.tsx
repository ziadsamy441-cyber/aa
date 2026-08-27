import { Leaf, MapPin, Flame, TrendingUp } from 'lucide-react';
import type { ProductBadge } from '@/types';
import { Badge } from '@/components/common';

interface ProductBadgesProps {
  badges: ProductBadge[];
  size?: 'sm' | 'md';
}

const badgeConfig: Record<
  ProductBadge,
  { label: string; variant: 'eco' | 'origin' | 'accent' | 'default'; icon?: React.ReactNode }
> = {
  eco: { label: 'Eco-friendly', variant: 'eco', icon: <Leaf size={10} /> },
  local: { label: 'Local origin', variant: 'origin', icon: <MapPin size={10} /> },
  bestseller: { label: 'Bestseller', variant: 'accent', icon: <Flame size={10} /> },
  trending: { label: 'Trending', variant: 'default', icon: <TrendingUp size={10} /> },
  featured: { label: 'Featured', variant: 'default' },
};

function ProductBadges({ badges, size = 'md' }: ProductBadgesProps) {
  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {badges.map((badge) => {
        const config = badgeConfig[badge];
        if (!config) return null;
        return (
          <Badge
            key={badge}
            variant={config.variant}
            icon={config.icon}
            className={size === 'sm' ? 'text-[10px] px-2 py-0.5' : ''}
          >
            {config.label}
          </Badge>
        );
      })}
    </div>
  );
}

export { ProductBadges };
export type { ProductBadgesProps };
