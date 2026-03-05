import type { NavItem } from "./BottomNavigation.types";

export const BottomNavigationButton = ({ item }: { item: NavItem }) => {
  const Icon = item.icon;

  const handleButtonClick = () => {
    // Check if the browser supports it
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    console.log('Button clicked!');
  };

  return (
    <button className="flex-1 transition-transform duration-75 ease-out select-none active:scale-90" onClick={handleButtonClick}>
      <Icon className="mx-auto h-6 w-6 flex-1" />
      {item.label}
    </button>
  );
};
