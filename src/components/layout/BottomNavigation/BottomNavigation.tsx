import { styles } from './styles';
import { Apple, CookingPot, Home, ShoppingCart } from 'lucide-react';
import { BottomNavigationButton as BottomNavigationButton } from './BottomNavigationButton';
import type { NavItem } from './types';

export const BottomNavigation = () => {
  const navItems: NavItem[] = [
    { label: 'Today', icon: Home },
    { label: 'Kitchen', icon: ShoppingCart },
    { label: 'Plan', icon: Apple },
    { label: 'Meals', icon: CookingPot },
  ];

  return (
    <nav className={styles.container}>
      {navItems.map((item) => {
        return <BottomNavigationButton key={item.label} item={item} />;
      })}
    </nav>
  );
};
