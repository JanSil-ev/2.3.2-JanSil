import { useEffect, useState } from 'react';
import { IconCheck, IconShoppingCart } from '@tabler/icons-react';
import { Button, Card, Image, Text } from '@mantine/core';
import { CartItem, CardsItem } from '@/types'; 
import classes from './styles.module.css';
import { Steppers } from '@/components/steper';

interface Props extends CardsItem {
  addCart: (product: CardsItem, count: number) => void;
  cartItems: CartItem[]; 
}

export function ProductCard({ id, name, price, image, category, addCart, cartItems }: Props) {
  const CardNames = name.split(' - ');

  const [currentCount, setCurrentCount] = useState(1);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const existingItem = cartItems.find((item) => item.id === id);
    setIsInCart(!!existingItem);

    if (existingItem) {
      setCurrentCount(existingItem.count);
    }
  }, [cartItems, id]);

  const handleCountChange = (newCount: number) => {
    setCurrentCount(newCount);

    if (isInCart) {
      addCart(
        {
          id,
          name,
          price,
          image,
          category,
        },
        newCount
      );
    }
  };

  const handleAddToCart = () => {
    if (currentCount > 0) {
      addCart(
        {
          id,
          name,
          price,
          image,
          category,
        },
        currentCount
      );
    }
  };

  return (
    <Card key={id} shadow="sm" padding="lg" radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src={image} alt={CardNames[0]} className={classes.image} />
      </Card.Section>

      <div className={classes.infoSection}>
        <div className={classes.productSection}>
          <Text fw={700} size="lg" className={classes.productName}>
            {CardNames[0]}
          </Text>{' '}
          <Text size="" className={classes.productKG}>
            {CardNames[1]}
          </Text>
        </div>
        <Steppers
          onCountChange={handleCountChange}
          initialCount={currentCount}
          key={currentCount}
        />
      </div>

      <div className={classes.priceSection}>
        <Text fw={7} size="xl" className={classes.price}>
          $ {currentCount > 1 ? (price * currentCount) : price}
        </Text>

        <Button
          color={isInCart ? 'green' : 'brand.5'}
          mt="md"
          radius="md"
          disabled={currentCount === 0}
          className={classes.addButton}
          onClick={isInCart ? undefined : handleAddToCart}
          leftSection={isInCart ? <IconCheck size={18} /> : <IconShoppingCart size={18} />}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </Button>
      </div>
    </Card>
  );
}