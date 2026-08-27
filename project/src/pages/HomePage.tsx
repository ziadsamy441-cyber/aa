import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Hammer, Heart, Quote } from 'lucide-react';
import { PageContainer, Button } from '@/components/common';
import { ProductCard } from '@/components/product/ProductCard';
import { productService } from '@/services/productService';
import type { Product, Category } from '@/types';

function HomePage() {
  const [trending, setTrending] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    productService.getTrending().then(setTrending);
    productService.getBestSellers().then(setBestSellers);
    productService.getCategories().then(setCategories);
  }, []);

  const heroCategories = categories.slice(0, 6);

  return (
    <div className="animate-fade-in">
      {/* Hero — editorial artisan hero */}
      <section className="relative overflow-hidden bg-bg-secondary">
        <PageContainer className="py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: brand message */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-badge-eco px-3 py-1 text-xs font-medium text-badge-eco-text">
                <Leaf size={12} />
                One maker. One studio.
              </div>
              <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.15] text-ink-primary sm:text-5xl lg:text-[3.5rem]">
                Handmade pieces
                <br />
                with a story
                <br />
                of their own.
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-secondary">
                Ceramics, textiles, wood, and candles — shaped, fired, and
                stitched by a single artisan in a converted barn in the Hudson
                Valley.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/shop">
                  <Button size="lg" rightIcon={<ArrowRight size={18} />}>
                    Shop the collection
                  </Button>
                </Link>
                <Link to="/maker">
                  <Button variant="outline" size="lg">
                    Meet the maker
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: large editorial image */}
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-card shadow-lift lg:aspect-[5/6]">
                <img
                  src="https://images.pexels.com/photos/29286721/pexels-photo-29286721.jpeg?auto=compress&cs=tinysrgb&h=1000"
                  alt="Hand-thrown stoneware vase by Elena Marsh"
                  className="h-full w-full object-cover"
                />
                {/* Floating caption card */}
                <div className="absolute bottom-4 left-4 right-4 rounded-card bg-bg-surface/95 px-5 py-3 shadow-soft backdrop-blur-sm">
                  <p className="font-serif text-sm font-medium text-ink-primary">
                    Hand-Thrown Sandstone Vase
                  </p>
                  <p className="text-xs text-ink-secondary">
                    Stoneware, wood-fired, cone 6
                  </p>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Values strip */}
      <section className="border-b border-border">
        <PageContainer className="py-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { icon: Hammer, title: 'Made by hand', text: 'No production lines. No assistants. Just one pair of hands.' },
              { icon: Leaf, title: 'Considered materials', text: 'Local clays, natural dyes, and reclaimed wood, chosen with care.' },
              { icon: Heart, title: 'Made to last', text: 'Objects designed to be used, loved, and kept for years.' },
            ].map((item) => (
              <div key={item.title} className="text-center sm:text-left">
                <item.icon
                  size={28}
                  strokeWidth={1.5}
                  className="mx-auto text-accent sm:mx-0 mb-3"
                />
                <h3 className="text-base font-semibold text-ink-primary">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-ink-secondary">{item.text}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Shop by Category */}
      <section className="border-b border-border bg-bg-secondary">
        <PageContainer className="py-16 lg:py-20">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Browse by craft
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-ink-primary sm:text-3xl">
              Shop by Category
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-ink-secondary">
              Six crafts, one pair of hands. Find the material that speaks to
              your home.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {heroCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.slug}`}
                className="group flex flex-col items-center justify-center rounded-card border border-border bg-bg-surface p-5 text-center transition-all duration-300 hover:shadow-card hover:border-accent/40"
              >
                {cat.image && (
                  <div className="mb-3 h-14 w-14 overflow-hidden rounded-full ring-2 ring-border group-hover:ring-accent/30 transition-all">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <h3 className="font-serif text-sm font-medium text-ink-primary group-hover:text-accent transition-colors">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Trending */}
      {trending.length > 0 && (
        <section>
          <PageContainer className="py-16 lg:py-20">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Trending now
                </p>
                <h2 className="mt-2 font-serif text-2xl font-semibold text-ink-primary sm:text-3xl">
                  Pieces finding new homes
                </h2>
              </div>
              <Link to="/shop" className="hidden sm:block">
                <Button variant="ghost" rightIcon={<ArrowRight size={16} />}>
                  View all
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {trending.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </PageContainer>
        </section>
      )}

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="border-t border-border bg-bg-secondary">
          <PageContainer className="py-16 lg:py-20">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Best sellers
                </p>
                <h2 className="mt-2 font-serif text-2xl font-semibold text-ink-primary sm:text-3xl">
                  Studio favourites
                </h2>
              </div>
              <Link to="/shop" className="hidden sm:block">
                <Button variant="ghost" rightIcon={<ArrowRight size={16} />}>
                  View all
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {bestSellers.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </PageContainer>
        </section>
      )}

      {/* Meet the Maker teaser */}
      <section>
        <PageContainer className="py-16 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Maker image */}
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-card shadow-lift">
                <img
                  src="https://images.pexels.com/photos/6214863/pexels-photo-6214863.jpeg?auto=compress&cs=tinysrgb&h=800"
                  alt="Elena Marsh in her studio"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Signature accent */}
              <div className="absolute -bottom-4 -right-4 hidden rounded-card bg-accent px-5 py-3 text-white shadow-card sm:block">
                <p className="font-serif text-lg italic">Elena Marsh</p>
                <p className="text-xs opacity-80">Maker & Founder</p>
              </div>
            </div>

            {/* Story */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                The maker
              </p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-ink-primary sm:text-3xl">
                One pair of hands.
                <br />
                Every single piece.
              </h2>
              <div className="mt-5 space-y-4">
                <div className="relative rounded-card border border-border bg-bg-surface p-5">
                  <Quote
                    size={28}
                    className="absolute -top-3 left-4 text-accent/30 bg-bg-primary px-1"
                    strokeWidth={1}
                  />
                  <p className="font-serif text-base italic leading-relaxed text-ink-secondary">
                    I believe a home should feel lived in, not staged. The
                    things we keep should have a story we can tell.
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-ink-secondary">
                  Elena has been making in her converted barn for over twelve
                  years — throwing, carving, weaving, and pouring every piece
                  herself. No assistants, no production lines, no shortcuts.
                </p>
              </div>
              <Link to="/maker" className="inline-block mt-6">
                <Button variant="outline" size="lg" rightIcon={<ArrowRight size={18} />}>
                  Meet the maker
                </Button>
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* CTA — Custom Orders */}
      <section className="border-t border-border bg-bg-secondary">
        <PageContainer className="py-16 lg:py-24 text-center">
          <h2 className="font-serif text-2xl font-semibold text-ink-primary sm:text-3xl">
            Looking for something one-of-a-kind?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-ink-secondary">
            Commission a custom piece made just for you — from vessels to
            textiles to woodwork.
          </p>
          <Link to="/custom-orders" className="inline-block mt-6">
            <Button size="lg" rightIcon={<ArrowRight size={18} />}>
              Start a Custom Order
            </Button>
          </Link>
        </PageContainer>
      </section>
    </div>
  );
}

export { HomePage };
