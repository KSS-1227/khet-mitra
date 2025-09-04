import { Outlet } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import FabDetect from '@/components/FabDetect';

export default function AppLayout() {
  return (
    <div className="min-h-screen pb-16 bg-background">
      <AppHeader />
      <main className="container py-4">
        <Outlet />
      </main>
      <FabDetect />
      <BottomNav />
    </div>
  );
}