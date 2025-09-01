export interface CardsItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  map?: any; // Уберите это свойство, если оно не используется
}

// Правильный интерфейс для элемента корзины
export interface CartItem extends CardsItem {
  count: number;
}