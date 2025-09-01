import { useState } from 'react';
import { CartItem, CardsItem } from '@/types'; 
import { MainLayout } from './layout/MainLayout';
import { ProductCatalog } from './catalog/ProductCatalog';

export function Page() {
  const [cart, setCart] = useState<CartItem[]>([]); 

  const addCart = (product: CardsItem, count: number) => {
    setCart((prev: CartItem[]) => { 
      const existingItemIndex = prev.findIndex((item) => item.id === product.id);

      if (existingItemIndex >= 0) {
        return prev.map((item) => (item.id === product.id ? { ...item, count } : item));
      }
      return [...prev, { ...product, count }]; 
    });
  };

  const changeCount = (id: number, count: number) => {
    setCart((prev: CartItem[]) => {
      if (count <= 0) {
        return prev.filter((item) => item.id !== id);
      }

      return prev.map((item) => (item.id === id ? { ...item, count } : item));
    });
  };

  return (
    <MainLayout cart={cart} changeCount={changeCount}>
      <ProductCatalog addCart={addCart} cartItems={cart} />
    </MainLayout>
  );
}