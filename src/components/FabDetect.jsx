import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';

export default function FabDetect() {
  return (
    <div className="fixed bottom-20 right-4 z-50 sm:right-6">
      <Link
        to="/detect"
        aria-label="Quick disease detection"
        className="flex items-center justify-center h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Camera className="size-6" />
      </Link>
    </div>
  );
}
