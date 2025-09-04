import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { setPageMeta } from '@/lib/seo';
import hero from '@/assets/hero-farm.jpg';
import { Upload, Brain, ClipboardCheck, Handshake } from 'lucide-react';

const Index = () => {
  const { t } = useTranslation();

  useEffect(() => {
    setPageMeta({
      title: `${t('app.title')} | Smart Farming Assistant`,
      description: 'AI-powered agriculture portal: disease detection, weather insights, marketplace, and assistant in local languages.',
      canonical: location.href,
    });
  }, [t]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="container py-6 flex items-center justify-between">
        <div className="text-xl font-semibold">AgriAI</div>
        <LanguageSwitcher />
      </header>

      <section
        className="container rounded-2xl p-6 md:p-10 mb-10"
        style={{ background: 'var(--gradient-primary)' }}
      >
        <div className="grid md:grid-cols-2 gap-8 items-center text-primary-foreground">
          <div>
            <p className="uppercase tracking-wide text-xs md:text-sm/relaxed opacity-90 mb-2">AI-Powered Agriculture Solutions for Indian Farmers</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t('landing.h1')}</h1>
            <p className="text-lg opacity-90 mb-6">{t('landing.sub')}</p>
            <div className="flex flex-wrap gap-3">
              <a href="/register"><Button variant="hero">{t('app.cta')}</Button></a>
              <a href="/dashboard"><Button variant="secondary">Explore Dashboard</Button></a>
            </div>
          </div>
          <div className="relative">
            <img
              src={hero}
              alt="Indian farmer in field with AI assistance overlay"
              className="rounded-xl shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-1"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="container mb-10">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border bg-card p-4 text-center">
            <div className="text-2xl font-bold">10,000+</div>
            <div className="text-sm text-muted-foreground">Farmers Helped</div>
          </div>
          <div className="rounded-xl border bg-card p-4 text-center">
            <div className="text-2xl font-bold">95%</div>
            <div className="text-sm text-muted-foreground">Disease Detection Accuracy</div>
          </div>
          <div className="rounded-xl border bg-card p-4 text-center">
            <div className="text-2xl font-bold">30%</div>
            <div className="text-sm text-muted-foreground">Average Yield Increase</div>
          </div>
        </div>
      </section>

      <section className="container mb-16">
        <h2 className="text-2xl font-semibold mb-4">How it works</h2>
        <div className="grid sm:grid-cols-4 gap-4">
          <div className="rounded-xl border bg-card p-4">
            <Upload className="mb-2 text-primary" />
            <div className="font-medium">Upload crop image</div>
            <p className="text-sm text-muted-foreground">Use camera or gallery</p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <Brain className="mb-2 text-primary" />
            <div className="font-medium">Get AI diagnosis</div>
            <p className="text-sm text-muted-foreground">Fast & accurate results</p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <ClipboardCheck className="mb-2 text-primary" />
            <div className="font-medium">Follow treatment</div>
            <p className="text-sm text-muted-foreground">Clear step-by-step guide</p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <Handshake className="mb-2 text-primary" />
            <div className="font-medium">Connect suppliers</div>
            <p className="text-sm text-muted-foreground">Find nearby support</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
