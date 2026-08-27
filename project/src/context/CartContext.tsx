import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from 'react';
import type { Product } from '@/types';

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  image: string;
  stock: number;
  quantity: number;
}

export interface GiftOptions {
  giftWrapping: boolean;
  giftMessage: string;
}

interface CartState {
  items: CartItem[];
  gift: GiftOptions;
}

type CartAction =
  | { type: 'ADD'; product: Product; quantity?: number }
  | { type: 'REMOVE'; productId: string }
  | { type: 'INCREASE'; productId: string }
  | { type: 'DECREASE'; productId: string }
  | { type: 'SET_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'TOGGLE_GIFT_WRAPPING' }
  | { type: 'SET_GIFT_MESSAGE'; message: string }
  | { type: 'HYDRATE'; state: CartState };

const STORAGE_KEY = 'terra-thread-cart';

const GIFT_WRAPPING_FEE = 8;

const defaultGift: GiftOptions = {
  giftWrapping: false,
  giftMessage: '',
};

function getInitialCartState(): CartState {
  if (typeof window === 'undefined') {
    return { items: [], gift: defaultGift };
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as CartState;
      return {
        items: Array.isArray(parsed.items) ? parsed.items : [],
        gift: {
          giftWrapping: parsed.gift?.giftWrapping ?? false,
          giftMessage: parsed.gift?.giftMessage ?? '',
        },
      };
    }
  } catch {
    // ignore malformed storage
  }
  return { items: [], gift: defaultGift };
}

function findItem(items: CartItem[], productId: string): CartItem | undefined {
  return items.find((i) => i.productId === productId);
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return action.state;

    case 'ADD': {
      const { product, quantity = 1 } = action;
      if (product.stock <= 0) return state;

      const existing = findItem(state.items, product.id);
      if (existing) {
        const maxAdd = product.stock - existing.quantity;
        if (maxAdd <= 0) return state;
        const addQty = Math.min(quantity, maxAdd);
        return {
          ...state,
          items: state.items.map((i) =>
            i.productId === product.id
              ? { ...i, quantity: i.quantity + addQty }
              : i
          ),
        };
      }
      const addQty = Math.min(quantity, product.stock);
      const newItem: CartItem = {
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        currency: product.currency,
        image: product.images[0] ?? '',
        stock: product.stock,
        quantity: addQty,
      };
      return { ...state, items: [...state.items, newItem] };
    }

    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter((i) => i.productId !== action.productId),
      };

    case 'INCREASE': {
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.productId && i.quantity < i.stock
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };
    }

    case 'DECREASE':
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.productId === action.productId
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter((i) => i.quantity > 0),
      };

    case 'SET_QUANTITY': {
      const qty = Math.max(0, action.quantity);
      if (qty === 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.productId !== action.productId),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.productId
            ? { ...i, quantity: Math.min(qty, i.stock) }
            : i
        ),
      };
    }

    case 'CLEAR':
      return { items: [], gift: defaultGift };

    case 'TOGGLE_GIFT_WRAPPING':
      return {
        ...state,
        gift: {
          ...state.gift,
          giftWrapping: !state.gift.giftWrapping,
        },
      };

    case 'SET_GIFT_MESSAGE':
      return {
        ...state,
        gift: { ...state.gift, giftMessage: action.message },
      };

    default:
      return state;
  }
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  shipping: number;
  giftWrapping: number;
  total: number;
  currency: string;
}

export interface CartContextValue {
  items: CartItem[];
  gift: GiftOptions;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleGiftWrapping: () => void;
  setGiftMessage: (message: string) => void;
  getQuantity: (productId: string) => number;
  isInCart: (productId: string) => boolean;
  totals: CartTotals;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function calculateTotals(state: CartState): CartTotals {
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  const currency = state.items[0]?.currency ?? 'USD';
  const giftWrapping = state.gift.giftWrapping && state.items.length > 0
    ? GIFT_WRAPPING_FEE
    : 0;
  // Free shipping over $150, otherwise $9
  const baseShipping = subtotal === 0 || subtotal >= 150 ? 0 : 9;
  const shipping = state.items.length > 0 ? baseShipping : 0;
  const total = subtotal + shipping + giftWrapping;

  return { itemCount, subtotal, shipping, giftWrapping, total, currency };
}

function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    getInitialCartState
  );

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
  }, [state]);

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue) as CartState;
          dispatch({
            type: 'HYDRATE',
            state: {
              items: Array.isArray(parsed.items) ? parsed.items : [],
              gift: {
                giftWrapping: parsed.gift?.giftWrapping ?? false,
                giftMessage: parsed.gift?.giftMessage ?? '',
              },
            },
          });
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const totals = calculateTotals(state);

  const value: CartContextValue = {
    items: state.items,
    gift: state.gift,
    addItem: (product, quantity) =>
      dispatch({ type: 'ADD', product, quantity }),
    removeItem: (productId) => dispatch({ type: 'REMOVE', productId }),
    increaseQuantity: (productId) =>
      dispatch({ type: 'INCREASE', productId }),
    decreaseQuantity: (productId) =>
      dispatch({ type: 'DECREASE', productId }),
    setQuantity: (productId, quantity) =>
      dispatch({ type: 'SET_QUANTITY', productId, quantity }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
    toggleGiftWrapping: () => dispatch({ type: 'TOGGLE_GIFT_WRAPPING' }),
    setGiftMessage: (message) =>
      dispatch({ type: 'SET_GIFT_MESSAGE', message }),
    getQuantity: (productId) =>
      findItem(state.items, productId)?.quantity ?? 0,
    isInCart: (productId) => !!findItem(state.items, productId),
    totals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export { CartProvider, useCart, GIFT_WRAPPING_FEE };
