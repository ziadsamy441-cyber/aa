import { useState } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { classNames } from '@/utils/format';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const hasMultiple = images.length > 1;

  const goPrev = () =>
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () =>
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="group relative aspect-[4/5] overflow-hidden rounded-card bg-bg-placeholder">
        <img
          src={images[activeIndex]}
          alt={alt}
          className="h-full w-full object-cover transition-opacity duration-300"
          key={activeIndex}
        />

        {/* Zoom button */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-bg-surface/90 text-ink-secondary shadow-soft transition-all hover:text-accent hover:scale-105"
          aria-label="View full size"
        >
          <ZoomIn size={18} strokeWidth={1.5} />
        </button>

        {/* Nav arrows (only if multiple images) */}
        {hasMultiple && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-bg-surface/90 text-ink-secondary opacity-0 shadow-soft transition-all hover:text-accent group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-bg-surface/90 text-ink-secondary opacity-0 shadow-soft transition-all hover:text-accent group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {hasMultiple && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={classNames(
                'relative h-20 w-16 overflow-hidden rounded-btn border-2 transition-all duration-200',
                activeIndex === i
                  ? 'border-accent ring-1 ring-accent/30'
                  : 'border-border hover:border-accent/40'
              )}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={img}
                alt={`${alt} view ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-bg-surface/20 text-white transition-colors hover:bg-bg-surface/40"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          {hasMultiple && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-bg-surface/20 text-white transition-colors hover:bg-bg-surface/40"
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-bg-surface/20 text-white transition-colors hover:bg-bg-surface/40"
                aria-label="Next image"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          <img
            src={images[activeIndex]}
            alt={alt}
            className="max-h-[85vh] max-w-[90vw] rounded-card object-contain animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export { ProductGallery };
export type { ProductGalleryProps };
