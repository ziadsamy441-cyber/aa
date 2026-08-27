import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { routes } from '@/routes';

const router = createBrowserRouter(routes);

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
