import { Link } from 'react-router-dom';
import { Leaf, Instagram, Mail } from 'lucide-react';
import { Logo } from './Logo';

const footerLinks = {
  shop: [
    { to: '/shop', label: 'All Products' },
    { to: '/categories', label: 'Categories' },
    { to: '/custom-orders', label: 'Custom Orders' },
  ],
  about: [
    { to: '/maker', label: 'Meet the Maker' },
    { to: '/cart', label: 'Your Cart' },
    { to: '/wishlist', label: 'Wishlist' },
  ],
};

function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-bg-secondary">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2 max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
              Premium handmade home decor by a single artisan. Every piece has
              a story — shaped, fired, dyed, or stitched by hand in a converted
              barn in the Hudson Valley.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-btn border border-border bg-bg-surface text-ink-secondary transition-colors hover:text-accent hover:border-accent"
                aria-label="Instagram"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-btn border border-border bg-bg-surface text-ink-secondary transition-colors hover:text-accent hover:border-accent"
                aria-label="Email"
              >
                <Mail size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-secondary">
              Shop
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-ink-primary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-secondary">
              Studio
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-ink-primary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-ink-secondary">
            &copy; {new Date().getFullYear()} Terra &amp; Thread. Made by hand,
            one piece at a time.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-ink-secondary">
            <Leaf size={14} strokeWidth={1.5} className="text-accent" />
            <span>One maker. One studio. One story per piece.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
