import { useEffect } from 'react';
import { setPageMeta } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic } from 'lucide-react';

export default function Register() {
  useEffect(() => {
    setPageMeta({ title: 'Register | AI Agriculture Portal', description: 'Create your account with voice-guided assistance', canonical: location.href });
  }, []);

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Register</h1>
      <div className="grid gap-3">
        <Input placeholder="Full Name" />
        <Input placeholder="Phone Number" type="tel" />
        <Button variant="secondary" className="justify-start gap-2" aria-label="Voice guidance">
          <Mic /> Voice guidance
        </Button>
        <Button>Continue</Button>
      </div>
    </div>
  );
}