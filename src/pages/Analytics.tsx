import { useEffect } from 'react';
import { setPageMeta } from '@/lib/seo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { month: 'Jan', yield: 20 },
  { month: 'Feb', yield: 24 },
  { month: 'Mar', yield: 28 },
  { month: 'Apr', yield: 35 },
  { month: 'May', yield: 40 },
  { month: 'Jun', yield: 38 },
];

export default function Analytics() {
  useEffect(() => {
    setPageMeta({ title: 'Analytics | AI Agriculture Portal', description: 'Farm productivity trends and insights', canonical: location.href });
  }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Analytics</h1>
      <Card>
        <CardHeader>
          <CardTitle>Yield Trend</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: 0, right: 12, top: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="yield" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}