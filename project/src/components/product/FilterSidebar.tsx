import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/common';
import { classNames } from '@/utils/format';
import type { ProductCategory, ProductMaterial } from '@/types';

interface FilterSidebarProps {
  categories: { slug: string; name: string }[];
  materials: { value: ProductMaterial; label: string }[];
  selectedCategory: string;
  selectedMaterial: string;
  priceRange: [number, number];
  appliedPriceRange: [number, number];
  onCategoryChange: (cat: string) => void;
  onMaterialChange: (material: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onApplyPrice: () => void;
  onClearAll: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const materialLabels: Record<string, string> = {
  clay: 'Clay',
  ceramic: 'Ceramic',
  wood: 'Wood',
  fabric: 'Fabric',
  metal: 'Metal',
  wax: 'Wax',
};

function FilterSidebar({
  categories,
  materials,
  selectedCategory,
  selectedMaterial,
  priceRange,
  appliedPriceRange,
  onCategoryChange,
  onMaterialChange,
  onPriceChange,
  onApplyPrice,
  onClearAll,
  isMobile = false,
  onClose,
}: FilterSidebarProps) {
  const [localPrice, setLocalPrice] = useState<[number, number]>(priceRange);

  const hasActiveFilters =
    selectedCategory !== '' ||
    selectedMaterial !== '' ||
    appliedPriceRange[0] > 0 ||
    appliedPriceRange[1] < 200;

  return (
    <div className="flex flex-col gap-6">
      {/* Header (mobile only) */}
      {isMobile && (
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="font-serif text-lg font-semibold text-ink-primary">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-btn text-ink-secondary hover:bg-bg-secondary"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Clear all */}
      {hasActiveFilters && (
        <button
          onClick={onClearAll}
          className="text-sm text-accent transition-colors hover:text-accent/80 self-start"
        >
          Clear all filters
        </button>
      )}

      {/* Category */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-ink-secondary">
          Category
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ''}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="h-4 w-4 accent-accent text-accent"
            />
            <span className="text-sm text-ink-primary">All categories</span>
          </label>
          {categories.map((cat) => (
            <label
              key={cat.slug}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                value={cat.slug}
                checked={selectedCategory === cat.slug}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="h-4 w-4 accent-accent text-accent"
              />
              <span className="text-sm text-ink-primary">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Material */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-ink-secondary">
          Material
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="radio"
              name="material"
              value=""
              checked={selectedMaterial === ''}
              onChange={(e) => onMaterialChange(e.target.value)}
              className="h-4 w-4 accent-accent text-accent"
            />
            <span className="text-sm text-ink-primary">All materials</span>
          </label>
          {materials.map((mat) => (
            <label
              key={mat.value}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <input
                type="radio"
                name="material"
                value={mat.value}
                checked={selectedMaterial === mat.value}
                onChange={(e) => onMaterialChange(e.target.value)}
                className="h-4 w-4 accent-accent text-accent"
              />
              <span className="text-sm text-ink-primary">
                {materialLabels[mat.value] ?? mat.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-ink-secondary">
          Price
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs text-ink-secondary">Min</label>
              <div className="relative mt-1">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-ink-secondary">$</span>
                <input
                  type="number"
                  min={0}
                  max={localPrice[1]}
                  value={localPrice[0]}
                  onChange={(e) =>
                    setLocalPrice([Number(e.target.value), localPrice[1]])
                  }
                  className="w-full rounded-btn border border-border bg-bg-surface py-1.5 pl-6 pr-2 text-sm text-ink-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-xs text-ink-secondary">Max</label>
              <div className="relative mt-1">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-ink-secondary">$</span>
                <input
                  type="number"
                  min={localPrice[0]}
                  max={200}
                  value={localPrice[1]}
                  onChange={(e) =>
                    setLocalPrice([localPrice[0], Number(e.target.value)])
                  }
                  className="w-full rounded-btn border border-border bg-bg-surface py-1.5 pl-6 pr-2 text-sm text-ink-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => {
              onPriceChange(localPrice);
              onApplyPrice();
            }}
          >
            Apply price
          </Button>
        </div>
      </div>

      {/* Apply button (mobile only) */}
      {isMobile && (
        <Button
          className={classNames(isMobile && 'sticky bottom-0')}
          fullWidth
          onClick={onClose}
        >
          Show results
        </Button>
      )}
    </div>
  );
}

export { FilterSidebar };
export type { FilterSidebarProps };
