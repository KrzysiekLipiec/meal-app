import { NavLink } from 'react-router-dom';
import type { NavItem } from './types';
import { cn } from '@/lib/utils';

export const BottomNavigationButton = ({ item, isActive, onClick }: { item: NavItem; isActive: boolean; onClick: () => void }) => {
  const Icon = item.icon;

  const handleButtonClick = () => {
    // Check if the browser supports it
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }

    onClick();
  };

  return (
    <NavLink
      to={item.route}
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl px-5 py-2',
        isActive ? 'bg-secondary text-secondary-foreground transition-all duration-300 active:scale-90' : 'hover:text-primary transition-colors',
      )}
      onClick={handleButtonClick}
    >
      <Icon className="h-6 w-6" />
      <span className="font-jakarta mt-1 text-[11px] font-semibold tracking-wide">{item.label}</span>
    </NavLink>
  );
};
