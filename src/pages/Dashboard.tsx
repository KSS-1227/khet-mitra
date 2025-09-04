import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, CloudSun, Store, MessageCircle } from 'lucide-react';
import { setPageMeta } from '@/lib/seo';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  useEffect(() => {
    setPageMeta({ title: 'Dashboard | AI Agriculture Portal', description: 'Your personalized farming dashboard', canonical: location.href });
  }, []);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-muted-foreground">Quick actions</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
          <Button variant="hero" className="h-24 flex flex-col items-center justify-center" asChild>
            <Link to="/detect">
              <Camera />
              Detect
            </Link>
          </Button>
          <Button variant="secondary" className="h-24 flex flex-col items-center justify-center" asChild>
            <Link to="/weather">
              <CloudSun />
              Weather
            </Link>
          </Button>
          <Button variant="secondary" className="h-24 flex flex-col items-center justify-center" asChild>
            <Link to="/market">
              <Store />
              Market
            </Link>
          </Button>
          <Button variant="secondary" className="h-24 flex flex-col items-center justify-center" asChild>
            <Link to="/chat">
              <MessageCircle />
              Chat
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Weather</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <div>
                <div className="text-3xl font-semibold">29°C</div>
                <div className="text-muted-foreground">Partly cloudy</div>
              </div>
              <CloudSun className="size-10 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Market Price Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Wheat price up 3% this week.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}