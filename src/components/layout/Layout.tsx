import { Outlet } from 'react-router-dom';
import { BottomNavigation } from './BottomNavigation';

export default function Layout() {
  return (
    <div className="bg-background flex h-dvh w-full flex-col overflow-hidden">
      {/*TODO: create header*/}
      <p className="w-full flex-none bg-background/70 py-2 pr-4 pl-4 text-3xl backdrop-blur-xl">Meal work? Maybe</p>
      {/* The main content area where pages swap in and out */}
      <main className="relative min-h-0 flex-1">
        <Outlet />
      </main>

      {/* This stays mounted 100% of the time */}
      <BottomNavigation />
    </div>
  );
}
