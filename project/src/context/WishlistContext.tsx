import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from 'react';
import type { Product } from '@/types';

interface WishlistState {
  ids: string[];
}

type WishlistAction =
  | { type: 'ADD'; productId: string }
  | { type: 'REMOVE'; productId: string }
  | { type: 'TOGGLE'; productId: string }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; ids: string[] };

const STORAGE_KEY = 'terra-thread-wishlist';

function getInitialWishlist(): WishlistState {
  if (typeof window === 'undefined') return { ids: [] };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return { ids: parsed };
      if (Array.isArray(parsed?.ids)) return { ids: parsed.ids };
    }
  } catch {
    // ignore
  }
  return { ids: [] };
}

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'HYDRATE':
      return { ids: action.ids };

    case 'ADD':
      if (state.ids.includes(action.productId)) return state;
      return { ids: [...state.ids, action.productId] };

    case 'REMOVE':
      return { ids: state.ids.filter((id) => id !== action.productId) };

    case 'TOGGLE':
      if (state.ids.includes(action.productId)) {
        return { ids: state.ids.filter((id) => id !== action.productId) };
      }
      return { ids: [...state.ids, action.productId] };

    case 'CLEAR':
      return { ids: [] };

    default:
      return state;
  }
}

export interface WishlistContextValue {
  ids: string[];
  count: number;
  add: (productId: string) => void;
  remove: (productId: string) => void;
  toggle: (productId: string) => void;
  clear: () => void;
  has: (productId: string) => boolean;
  toggleWithProduct: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);

function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    wishlistReducer,
    undefined,
    getInitialWishlist
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.ids));
    } catch {
      // ignore
    }
  }, [state.ids]);

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          const ids = Array.isArray(parsed) ? parsed : parsed?.ids ?? [];
          dispatch({ type: 'HYDRATE', ids });
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value: WishlistContextValue = {
    ids: state.ids,
    count: state.ids.length,
    add: (productId) => dispatch({ type: 'ADD', productId }),
    remove: (productId) => dispatch({ type: 'REMOVE', productId }),
    toggle: (productId) => dispatch({ type: 'TOGGLE', productId }),
    clear: () => dispatch({ type: 'CLEAR' }),
    has: (productId) => state.ids.includes(productId),
    toggleWithProduct: (product) => dispatch({ type: 'TOGGLE', productId: product.id }),
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}

export { WishlistProvider, useWishlist };
