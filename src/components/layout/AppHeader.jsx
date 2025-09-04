import { Menu, Search, ArrowLeft } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Input } from '@/components/ui/input';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const showBack = location.pathname !== '/' && location.pathname !== '/dashboard';

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              aria-label="Go back"
              onClick={() => navigate(-1)}
              className="p-2 rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft className="size-5" />
            </button>
          )}
          <button aria-label="Menu" className="p-2 rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Menu className="size-5" />
          </button>
          <a href="/" className="font-semibold">AgriAI</a>
        </div>
        <div className="flex-1 max-w-md hidden sm:flex items-center gap-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search..." />
          </div>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
}