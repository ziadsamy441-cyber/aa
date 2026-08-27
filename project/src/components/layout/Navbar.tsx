import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { classNames } from '@/utils/format';
import { Logo } from './Logo';

const navLinks = [
  { to: '/shop', label: 'Shop' },
  { to: '/categories', label: 'Categories' },
  { to: '/maker', label: 'Meet the Maker' },
  { to: '/custom-orders', label: 'Custom Orders' },
];

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { totals } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
      setMobileOpen(false);
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(
      'relative text-sm font-medium transition-colors duration-200',
      isActive ? 'text-accent' : 'text-ink-primary hover:text-accent'
    );

  const renderCountBadge = (count: number) => {
    if (count <= 0) return null;
    return (
      <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
        {count > 99 ? '99+' : count}
      </span>
    );
  };

  return (
    <>
      <header
        className={classNames(
          'sticky top-0 z-40 border-b transition-all duration-300',
          scrolled
            ? 'bg-bg-primary/95 backdrop-blur-sm border-border shadow-soft'
            : 'bg-bg-primary border-transparent'
        )}
      >
        <nav className="mx-auto flex max-w-page items-center justify-between px-4 sm:px-6 lg:px-8 h-16 lg:h-20">
          {/* Left: logo + desktop nav */}
          <div className="flex items-center gap-8">
            <Logo />
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={navLinkClass}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen((s) => !s)}
              className="flex h-9 w-9 items-center justify-center rounded-btn text-ink-primary transition-colors hover:bg-bg-secondary"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-btn text-ink-primary transition-colors hover:bg-bg-secondary"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon size={20} strokeWidth={1.5} />
              ) : (
                <Sun size={20} strokeWidth={1.5} />
              )}
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative flex h-9 w-9 items-center justify-center rounded-btn text-ink-primary transition-colors hover:bg-bg-secondary"
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart size={20} strokeWidth={1.5} />
              {renderCountBadge(wishlistCount)}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-btn text-ink-primary transition-colors hover:bg-bg-secondary"
              aria-label={`Cart (${totals.itemCount} items)`}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {renderCountBadge(totals.itemCount)}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-btn text-ink-primary transition-colors hover:bg-bg-secondary lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </nav>

        {/* Expandable search bar */}
        {searchOpen && (
          <div className="border-t border-border bg-bg-primary animate-slide-up">
            <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8 py-4">
              <form onSubmit={handleSearch} className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-secondary"
                />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ceramics, textiles, candles..."
                  className="w-full rounded-btn border border-border bg-bg-surface py-2.5 pl-11 pr-4 text-sm text-ink-primary placeholder:text-ink-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                />
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 animate-fade-in"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-0 h-full w-72 max-w-[80vw] bg-bg-surface shadow-lift animate-slide-in-right flex flex-col">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="font-serif text-lg font-semibold text-ink-primary">
                Menu
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-btn text-ink-secondary hover:bg-bg-secondary hover:text-ink-primary"
                aria-label="Close menu"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-3 py-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    classNames(
                      'rounded-btn px-4 py-3 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-accent/10 text-accent'
                        : 'text-ink-primary hover:bg-bg-secondary'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-auto border-t border-border px-5 py-4">
              <Link
                to="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between py-2 text-sm font-medium text-ink-primary hover:text-accent"
              >
                <span className="flex items-center gap-3">
                  <Heart size={20} strokeWidth={1.5} />
                  Wishlist
                </span>
                {wishlistCount > 0 && (
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between py-2 text-sm font-medium text-ink-primary hover:text-accent"
              >
                <span className="flex items-center gap-3">
                  <ShoppingBag size={20} strokeWidth={1.5} />
                  Cart
                </span>
                {totals.itemCount > 0 && (
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                    {totals.itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { Navbar };
