import { NavLink } from 'react-router-dom';
import { Home, Camera, MessageCircle, Store, User, TrendingUp, Leaf } from 'lucide-react';

const items = [
  { to: '/dashboard', label: 'Home', Icon: Home },
  { to: '/detect', label: 'Detect', Icon: Camera },
  { to: '/chat', label: 'Chat', Icon: MessageCircle },
  { to: '/trends', label: '📈 Trends', Icon: TrendingUp },
  { to: '/market', label: 'Market', Icon: Store },
  { to: '/practices', label: '🌾 Practices', Icon: Leaf },
  { to: '/profile', label: 'Profile', Icon: User },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 border-t bg-background/90 backdrop-blur">
      <ul className="grid grid-cols-7">
        {items.map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              aria-label={label}
              className={({ isActive }) => `flex h-16 flex-col items-center justify-center text-xs ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon className="mb-1 size-5" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}