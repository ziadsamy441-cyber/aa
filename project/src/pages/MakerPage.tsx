import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Hammer, Wrench, ArrowRight, MapPin } from 'lucide-react';
import { PageContainer, Button } from '@/components/common';
import { ProductCard } from '@/components/product/ProductCard';
import { makerStory } from '@/data/catalog';
import { productService } from '@/services/productService';
import type { Product } from '@/types';

const processIcons = [Hammer, Wrench, Leaf];

function MakerPage() {
  const [makerProducts, setMakerProducts] = useState<Product[]>([]);

  useEffect(() => {
    productService.getBestSellers().then((best) => {
      if (best.length >= 4) {
        setMakerProducts(best.slice(0, 4));
      } else {
        productService.getFeatured().then((featured) => {
          setMakerProducts([...best, ...featured].slice(0, 4));
        });
      }
    });
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero — portrait + intro */}
      <section className="bg-bg-secondary">
        <PageContainer className="py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-5">
            {/* Portrait */}
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-card shadow-lift">
                  <img
                    src={makerStory.portraitImage}
                    alt={makerStory.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Name card */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-card bg-bg-surface px-6 py-3 text-center shadow-card w-[85%]">
                  <p className="font-serif text-lg font-medium text-ink-primary">
                    {makerStory.name}
                  </p>
                  <p className="text-xs text-ink-secondary">{makerStory.title}</p>
                </div>
              </div>
            </div>

            {/* Intro text */}
            <div className="lg:col-span-3 mt-6 lg:mt-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                The Artisan
              </p>
              <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-ink-primary sm:text-4xl lg:text-5xl">
                Meet the Maker
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-secondary">
                Terra & Thread is the work of one person — from the first lump
                of clay to the last stitch. No team, no factory, no middlemen.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm text-ink-secondary">
                <MapPin size={16} className="text-accent" strokeWidth={1.5} />
                {makerStory.studioLocation}
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-6">
                <div>
                  <p className="font-serif text-3xl font-semibold text-accent">
                    {makerStory.yearsPracticing}
                  </p>
                  <p className="mt-1 text-xs text-ink-secondary">Years at the wheel</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-semibold text-accent">1</p>
                  <p className="mt-1 text-xs text-ink-secondary">Maker</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-semibold text-accent">0</p>
                  <p className="mt-1 text-xs text-ink-secondary">Production lines</p>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Personal story */}
      <PageContainer className="py-16 lg:py-24" maxWidth="narrow">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          The story
        </p>
        <div className="mt-6 space-y-5">
          {makerStory.bio.map((para, i) => (
            <p
              key={i}
              className="text-center font-serif text-lg leading-relaxed text-ink-primary sm:text-xl lg:leading-[1.8]"
            >
              {para}
            </p>
          ))}
        </div>
      </PageContainer>

      {/* The Studio — text + image */}
      <section className="border-y border-border bg-bg-secondary">
        <PageContainer className="py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Where it happens
              </p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-ink-primary sm:text-3xl">
                {makerStory.studio.heading}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-secondary">
                {makerStory.studio.text}
              </p>
            </div>
            <div className="aspect-[5/4] overflow-hidden rounded-card shadow-card">
              <img
                src={makerStory.studio.images[0].src}
                alt={makerStory.studio.images[0].caption}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Behind-the-scenes gallery */}
      <PageContainer className="py-16 lg:py-20">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Behind the scenes
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-ink-primary sm:text-3xl">
            Inside the studio
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {makerStory.studio.images.map((img, i) => (
            <figure
              key={i}
              className="group overflow-hidden rounded-card border border-border bg-bg-surface"
            >
              <div className="aspect-square overflow-hidden bg-bg-placeholder">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <figcaption className="p-3 text-xs text-ink-secondary leading-relaxed">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </PageContainer>

      {/* Making process */}
      <section className="border-y border-border bg-bg-secondary">
        <PageContainer className="py-16 lg:py-20">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              From raw to ready
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-ink-primary sm:text-3xl">
              The Making Process
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {makerStory.process.map((step, i) => {
              const Icon = processIcons[i] ?? Hammer;
              return (
                <div key={step.title} className="text-center">
                  {/* Number + icon */}
                  <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-bg-surface text-accent shadow-soft">
                    <Icon size={26} strokeWidth={1.5} />
                    <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-medium text-ink-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </PageContainer>
      </section>

      {/* Studio values */}
      <PageContainer className="py-16 lg:py-20" maxWidth="narrow">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            What I believe
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-ink-primary sm:text-3xl">
            Studio Values
          </h2>
        </div>
        <ul className="space-y-3">
          {makerStory.values.map((value, i) => (
            <li
              key={value}
              className="flex items-center gap-4 rounded-card border border-border bg-bg-surface p-5 animate-slide-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Leaf size={16} strokeWidth={1.5} />
              </span>
              <span className="text-sm text-ink-primary">{value}</span>
            </li>
          ))}
        </ul>
      </PageContainer>

      {/* Maker products */}
      {makerProducts.length > 0 && (
        <section className="border-t border-border bg-bg-secondary">
          <PageContainer className="py-16 lg:py-20">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  From the maker's hands
                </p>
                <h2 className="mt-2 font-serif text-2xl font-semibold text-ink-primary sm:text-3xl">
                  Elena's pieces
                </h2>
              </div>
              <Link to="/shop" className="hidden sm:block">
                <Button variant="ghost" rightIcon={<ArrowRight size={16} />}>
                  View all
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {makerProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </PageContainer>
        </section>
      )}

      {/* CTA */}
      <PageContainer className="py-16 lg:py-24 text-center" maxWidth="narrow">
        <h2 className="font-serif text-2xl font-semibold text-ink-primary sm:text-3xl">
          Want something made just for you?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ink-secondary">
          Commission a one-of-a-kind piece. Tell me your vision and I'll make
          it by hand.
        </p>
        <Link to="/custom-orders" className="inline-block mt-6">
          <Button size="lg" rightIcon={<ArrowRight size={18} />}>
            Start a Custom Order
          </Button>
        </Link>
      </PageContainer>
    </div>
  );
}

export { MakerPage };
