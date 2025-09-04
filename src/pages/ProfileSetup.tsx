import { useEffect } from 'react';
import { setPageMeta } from '@/lib/seo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ProfileSetup() {
  useEffect(() => {
    setPageMeta({ title: 'Profile Setup | AI Agriculture Portal', description: 'Add your farm details for personalized advice', canonical: location.href });
  }, []);

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Profile Setup</h1>
      <div className="grid gap-3">
        <Input placeholder="Location" />
        <Input placeholder="Primary Crops (comma separated)" />
        <Input placeholder="Farm Size (acres)" />
        <Button>Save</Button>
      </div>
    </div>
  );
}