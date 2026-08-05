import { useState } from 'react';
import { CalendarDays, ReceiptText, Refrigerator, UtensilsCrossed } from 'lucide-react';
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
    <nav className="flex w-full flex-none items-center justify-around rounded-t-[1.5rem] bg-white/80 px-4 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(0,30,48,0.04)] backdrop-blur-2xl dark:bg-background/80">
      {navItems.map((item) => {
        return <BottomNavigationButton key={item.id} item={item} isActive={activeButtom === item.id} onClick={() => setActiveButton(item.id)} />;
      })}
    </nav>
  );
};
