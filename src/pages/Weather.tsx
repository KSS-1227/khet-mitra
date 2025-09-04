import { useEffect } from 'react';
import { setPageMeta } from '@/lib/seo';

export default function Weather() {
  useEffect(() => {
    setPageMeta({ title: 'Weather | AI Agriculture Portal', description: '7-day forecast and crop recommendations', canonical: location.href });
  }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Weather</h1>
      <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 text-center">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="border rounded-md p-3">
            <div className="text-sm text-muted-foreground">Day {i + 1}</div>
            <div className="text-xl font-semibold">{28 + (i % 3)}°C</div>
            <div className="text-xs">Cloudy</div>
          </div>
        ))}
      </div>
    </div>
  );
}