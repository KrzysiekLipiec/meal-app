import { Outlet } from 'react-router-dom';
import { BottomNavigation } from './BottomNavigation';

export default function Layout() {
  return (
    <div className="app-container">
      {/* The main content area where pages swap in and out */}
      <main className="content">
        <Outlet />
      </main>

      {/* This stays mounted 100% of the time */}
      <BottomNavigation />
    </div>
  );
}
