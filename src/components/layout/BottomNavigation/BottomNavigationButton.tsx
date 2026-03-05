import { NavLink } from 'react-router-dom';
import { styles } from './styles';
import type { NavItem } from './types';

export const BottomNavigationButton = ({ item }: { item: NavItem }) => {
  const Icon = item.icon;

  const handleButtonClick = () => {
    // Check if the browser supports it
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }

    // TODO
    console.log('Button clicked!');
  };

  return (
    <NavLink to={item.route} className={styles.button} onClick={handleButtonClick}>
      <Icon className={styles.icon} />
      <span className={styles.text}>{item.label}</span>
    </NavLink>
  );
};
