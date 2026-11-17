/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ProductModal } from './components/ProductModal';
import { PRODUCTS } from './data/catalog';
import { CatalogPage } from './pages/CatalogPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ContactPage } from './pages/ContactPage';
import { PromotionsPage } from './pages/PromotionsPage';
import { CartItem, CategoryId, PageId, Product } from './types';

const CART_STORAGE_KEY = 'gear_pro_store_cart_v1';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(PageId.Catalog);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(CategoryId.All);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as CartItem[];
      }
    } catch {
      // Ignore storage read errors
    }
    return [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage write errors
    }
  }, [cart]);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleAddBundle = () => {
    const mouse = PRODUCTS.find((p) => p.id === 'logitech-g-pro-x-superlight-2');
    const keyboard = PRODUCTS.find((p) => p.id === 'keychron-k2-max');
    if (mouse) handleAddToCart(mouse, 1);
    if (keyboard) handleAddToCart(keyboard, 1);
    setCartOpen(true);
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleBrowseCategory = (cat: CategoryId) => {
    setSelectedCategory(cat);
    setActivePage(PageId.Catalog);
    setTimeout(() => {
      const el = document.getElementById('catalog-browser');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex min-h-screen flex-col bg-[#0B192C] text-white">
      <Navbar
        activePage={activePage}
        onNavigate={setActivePage}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="flex-1">
        {activePage === PageId.Catalog && (
          <CatalogPage
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
            onSelectProduct={setModalProduct}
            onNavigate={setActivePage}
          />
        )}

        {activePage === PageId.Promotions && (
          <PromotionsPage
            onAddBundle={handleAddBundle}
            onAddToCart={handleAddToCart}
            onBrowseCategory={handleBrowseCategory}
            onNavigate={setActivePage}
          />
        )}

        {activePage === PageId.Checkout && (
          <CheckoutPage
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onAddToCart={handleAddToCart}
            onClearCart={handleClearCart}
            onNavigate={setActivePage}
          />
        )}

        {activePage === PageId.Contact && <ContactPage />}
      </main>

      <Footer onNavigate={setActivePage} />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onGoToCheckout={() => setActivePage(PageId.Checkout)}
        onNavigate={setActivePage}
      />

      <ProductModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
