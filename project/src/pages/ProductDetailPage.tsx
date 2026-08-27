import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import {
  PageContainer,
  Button,
  LoadingSkeleton,
  ErrorState,
} from '@/components/common';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductStory } from '@/components/product/ProductStory';
import { ReviewsSection } from '@/components/product/ReviewsSection';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { productService } from '@/services/productService';
import type { Product } from '@/types';

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    let active = true;
    setLoading(true);
    setError(false);

    productService.getById(id).then((data) => {
      if (!active) return;
      if (data) {
        setProduct(data);
        // Try related products, fall back to same category
        productService.getRelated(data.id).then((rel) => {
          if (!active) return;
          if (rel.length > 0) {
            setRelated(rel);
          } else {
            productService.getByCategory(data.category).then((sameCat) => {
              if (active) {
                setRelated(sameCat.filter((p) => p.id !== data.id).slice(0, 4));
              }
            });
          }
        });
      } else {
        setError(true);
      }
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <PageContainer className="py-12">
        <div className="mb-6 h-4 w-24 rounded-btn bg-bg-secondary animate-pulse" />
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <LoadingSkeleton className="aspect-[4/5] rounded-card" />
            <div className="flex gap-3">
              <LoadingSkeleton className="h-20 w-16 rounded-btn" />
              <LoadingSkeleton className="h-20 w-16 rounded-btn" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              <LoadingSkeleton className="h-6 w-20 rounded-full" />
              <LoadingSkeleton className="h-6 w-20 rounded-full" />
            </div>
            <LoadingSkeleton className="h-10 w-full" />
            <LoadingSkeleton className="h-5 w-32" />
            <LoadingSkeleton className="h-4 w-full" />
            <LoadingSkeleton className="h-4 w-3/4" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <LoadingSkeleton className="h-16 w-full rounded-btn" />
              <LoadingSkeleton className="h-16 w-full rounded-btn" />
            </div>
            <LoadingSkeleton className="h-12 w-40 rounded-btn mt-4" />
          </div>
        </div>
      </PageContainer>
    );
  }

  if (error || !product) {
    return (
      <PageContainer className="py-16">
        <ErrorState
          title="Piece not found"
          message="We couldn't find this piece. It may have sold or moved to a new home."
        />
        <div className="mt-6 text-center">
          <Link to="/shop">
            <Button variant="outline" leftIcon={<ArrowLeft size={16} />}>
              Back to shop
            </Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Top section: gallery + info */}
      <PageContainer className="py-8 lg:py-12">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm text-ink-secondary transition-colors hover:text-accent mb-6"
        >
          <ArrowLeft size={16} />
          Back to shop
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery images={product.images} alt={product.name} />
          <ProductInfo product={product} />
        </div>
      </PageContainer>

      {/* Editorial story section */}
      <ProductStory product={product} />

      {/* Reviews + related */}
      <PageContainer className="py-16 lg:py-20 space-y-16">
        <ReviewsSection product={product} />
        <RelatedProducts products={related} />
      </PageContainer>
    </div>
  );
}

export { ProductDetailPage };
