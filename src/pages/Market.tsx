import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { setPageMeta } from '@/lib/seo';

const products = [
  { id: 1, title: 'Fresh Tomatoes (50kg)', price: '₹1,800', location: 'Nashik', image: '/placeholder.svg' },
  { id: 2, title: 'Organic Wheat (100kg)', price: '₹3,200', location: 'Kanpur', image: '/placeholder.svg' },
];

export default function Market() {
  useEffect(() => {
    setPageMeta({ title: 'Marketplace | AI Agriculture Portal', description: 'Buy and sell farm produce and supplies', canonical: location.href });
  }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Marketplace</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {products.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <CardTitle className="text-base">{p.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded-md" loading="lazy" />
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium">{p.price}</div>
                <div className="text-muted-foreground">{p.location}</div>
              </div>
              <Button className="w-full">Contact Seller</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}