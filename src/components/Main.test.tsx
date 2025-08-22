import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { describe, it, expect, vi } from 'vitest';
import { Main } from './Main';

vi.mock('./CartButton/CartButton', () => ({
  CartButton: ({ numbers }: { numbers: number }) => (
    <div data-testid="cart-button">Cart items: {numbers}</div>
  ),
}));
vi.mock('./TodoList/TodoList', () => ({
  TodoList: ({ addCart }: { addCart: (product: any, count: number) => void }) => (
    <button type='button'
      data-testid="add-product-btn"
      onClick={() => addCart({ id: 1, name: 'Test product', count: 0 }, 1)}
    >
      Add product
    </button>
  ),
}));


function renderWithMantine(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

describe('Main component', () => {
  it('рендерит заголовок и кнопку Catalog', () => {
    renderWithMantine(<Main />);
    expect(screen.getByText('Vegetable')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /catalog/i })).toBeInTheDocument();
  });

  it('отображает количество товаров в CartButton', () => {
    renderWithMantine(<Main />);
    expect(screen.getByTestId('cart-button')).toHaveTextContent('Cart items: 0');
  });

  it('добавляет товар в корзину при вызове addCart из TodoList', () => {
    renderWithMantine(<Main />);
    const addBtn = screen.getByTestId('add-product-btn');

    fireEvent.click(addBtn);


    expect(screen.getByTestId('cart-button')).toHaveTextContent('Cart items: 1');
  });

  it('увеличивает count товара, если он уже есть в корзине', () => {
    renderWithMantine(<Main />);
    const addBtn = screen.getByTestId('add-product-btn');
    fireEvent.click(addBtn); 
    fireEvent.click(addBtn); 
    expect(screen.getByTestId('cart-button')).toHaveTextContent('Cart items: 1');

  });
});
