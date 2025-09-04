import { useEffect } from 'react';
import { setPageMeta } from '@/lib/seo';

export default function Community() {
  useEffect(() => {
    setPageMeta({ title: 'Community | AI Agriculture Portal', description: 'Connect with local farmers and experts', canonical: location.href });
  }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Community</h1>
      <ul className="space-y-3">
        {['Pest control tips for tomatoes', 'Best time to sow wheat in monsoon', 'How to improve soil health?'].map((t, i) => (
          <li key={i} className="border rounded-md p-3 hover:bg-accent/60 transition-colors">{t}</li>
        ))}
      </ul>
    </div>
  );
}