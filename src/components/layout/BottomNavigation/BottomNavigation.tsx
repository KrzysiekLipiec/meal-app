import { styles } from './styles';
import { Apple, CookingPot, Home, ShoppingCart } from 'lucide-react';
import { BottomNavigationButton as BottomNavigationButton } from './BottomNavigationButton';
import type { NavItem } from './types';

export const BottomNavigation = () => {
  const navItems: NavItem[] = [
    { label: 'Today', icon: Home, route: '/' },
    { label: 'Kitchen', icon: ShoppingCart, route: '/Kitchen' },
    { label: 'Plan', icon: Apple, route: '/Plan' },
    { label: 'Meals', icon: CookingPot, route: '/Meals' },
  ];

  return (
    <nav className={styles.container}>
      {navItems.map((item) => {
        return <BottomNavigationButton key={item.label} item={item} />;
      })}
    </nav>
  );
};
