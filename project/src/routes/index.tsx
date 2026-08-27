import type { RouteObject } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { ShopPage } from '@/pages/ShopPage';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { MakerPage } from '@/pages/MakerPage';
import { CustomOrdersPage } from '@/pages/CustomOrdersPage';
import { CartPage } from '@/pages/CartPage';
import { WishlistPage } from '@/pages/WishlistPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { OrderConfirmationPage } from '@/pages/OrderConfirmationPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'product/:id', element: <ProductDetailPage /> },
      { path: 'maker', element: <MakerPage /> },
      { path: 'custom-orders', element: <CustomOrdersPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'order-confirmation/:orderId', element: <OrderConfirmationPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
