// import { styles } from './BottomNavigationViewsActivity.styles';

export const BottomNavigationViewsActivity = () => {
  const buttonsNames = [{ name: 'Today' }, { name: 'Kitchen' }, { name: 'Plan' }, { name: 'Meals' }];

  return (
    <nav className={'fixed right-0 bottom-0 left-0 flex justify-around'}>
      {buttonsNames.map((buttonName) => {
        return (
          <button key={buttonName.name} className={'w-20 bg-amber-200'}>
            {buttonName.name}
          </button>
        );
      })}
    </nav>
  );
};
