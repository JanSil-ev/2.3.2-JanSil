import { AppShell } from '@mantine/core';
import { Header } from '../Header';
import { CartItem } from '@/types';
import classes from './styles.module.css';
import { useDisclosure } from '@mantine/hooks';

interface MainLayoutProps {
  children: React.ReactNode;
  cart: CartItem[];
  changeCount: (id: number, count: number) => void;
}

export function MainLayout({ children, cart, changeCount }: MainLayoutProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
      className={classes.appShell}
    >
      <AppShell.Header className={classes.headerSection}>
        <Header 
          cart={cart} 
          changeCount={changeCount} 
          onToggleMenu={toggle} 
          opened={opened} 
        />
      </AppShell.Header>
      
      <AppShell.Main className={classes.mainSection}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}