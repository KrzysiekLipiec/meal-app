import { useState } from 'react';
import { CalendarDays, ReceiptText, Refrigerator, UtensilsCrossed } from 'lucide-react';
import { styles } from './styles';
import { BottomNavigationButton as BottomNavigationButton } from './BottomNavigationButton';
import type { NavItem } from './types';
import { useLocation } from 'react-router-dom';

const navItems: NavItem[] = [
  { id: 1, label: 'Today', icon: CalendarDays, route: '/' },
  { id: 2, label: 'Kitchen', icon: Refrigerator, route: '/Kitchen' },
  { id: 3, label: 'Plan', icon: ReceiptText, route: '/Plan' },
  { id: 4, label: 'Meals', icon: UtensilsCrossed, route: '/Meals' },
];

export const BottomNavigation = () => {
  const location = useLocation();
  const [activeButtom, setActiveButton] = useState(navItems.find((item) => item.route === location.pathname)?.id ?? 1);

  return (
    <nav className={styles.container}>
      {navItems.map((item) => {
        return <BottomNavigationButton key={item.id} item={item} isActive={activeButtom === item.id} onClick={() => setActiveButton(item.id)} />;
      })}
    </nav>
  );
};
