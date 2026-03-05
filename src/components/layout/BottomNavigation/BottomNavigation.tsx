// import { styles } from './BottomNavigationViewsActivity.styles';

import { Apple, CookingPot, Home, ShoppingCart, type LucideIcon } from 'lucide-react';
import { BottomNavigationButton as BottomNavigationButton } from './BottomNavigationButton';

export const BottomNavigation = () => {
  interface NavItem {
    label: string;
    icon: LucideIcon; // Use this type from lucide-react
  }

  const navItems: NavItem[] = [
    { label: 'Today', icon: Home },
    { label: 'Kitchen', icon: ShoppingCart },
    { label: 'Plan', icon: Apple },
    { label: 'Meals', icon: CookingPot },
  ];

  return (
    <nav className="fixed bottom-0 flex h-1/12 w-full justify-around bg-amber-200 pt-2 pb-[env(safe-area-inset-bottom)]">
      {navItems.map((item) => {
        return <BottomNavigationButton key={item.label} item={item} />;
      })}
    </nav>
  );
};
