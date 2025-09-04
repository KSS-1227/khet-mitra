import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { setPageMeta } from '@/lib/seo';
import { Camera, Upload, Mic, StopCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CircularProgress } from '@/components/ui/circular-progress';
export default function Detect() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [cameraOpen, setCameraOpen] = useState(false);
  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [symptoms, setSymptoms] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setPageMeta({ title: 'Detect Disease | AI Agriculture Portal', description: 'Upload or capture plant images for AI-based disease detection', canonical: location.href });
  }, []);

  const simulate = () => {
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          return 100;
        }
        return p + 10;
      });
    }, 300);
  };

  const stage = progress === 0 ? '' : progress < 34 ? 'Uploading' : progress < 67 ? 'Analyzing' : progress < 100 ? 'Generating Results' : 'Results';
  const stageIndex = progress === 0 ? -1 : progress < 34 ? 0 : progress < 67 ? 1 : progress < 100 ? 2 : 3;

  const onFile = (f) => {
    setFile(f);
    simulate();
  };
  // Camera controls
  useEffect(() => {
    if (!cameraOpen) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      return;
    }
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (e) {
        console.error('Camera error', e);
        setCameraOpen(false);
      }
    })();
  }, [cameraOpen]);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const w = video.videoWidth || 1280;
    const h = video.videoHeight || 720;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, w, h);
    canvas.toBlob((blob) => {
      if (blob) {
        const f = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
        setCameraOpen(false);
        onFile(f);
      }
    }, 'image/jpeg', 0.9);
  };

  // Voice dictation (Web Speech API)
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = i18n.language;
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (e) => {
      let text = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        text += e.results[i][0].transcript + ' ';
      }
      setSymptoms(text.trim());
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
    return () => {
      try {
        rec.stop();
      } catch {}
    };
  }, [i18n.language]);

  const toggleListening = () => {
    const rec = recognitionRef.current;
    if (!rec) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    if (listening) {
      try {
        rec.stop();
      } catch {}
      setListening(false);
    } else {
      setSymptoms('');
      rec.lang = i18n.language;
      try {
        rec.start();
        setListening(true);
      } catch {}
    }
  };

  const analyzeText = () => {
    if (symptoms.trim().length > 0 || file) {
      simulate();
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t('detect.title', 'AI Disease Detection')}</h1>
      <div className="border rounded-lg p-6 space-y-4">
        <div className="flex flex-wrap gap-3">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => e.target.files && onFile(e.target.files[0])}
          />
          <Button variant="secondary" onClick={() => inputRef.current?.click()} className="h-12">
            <Upload /> {t('detect.upload', 'Upload from gallery')}
          </Button>
          <Button variant="hero" onClick={() => setCameraOpen(true)} className="h-12">
            <Camera /> {t('detect.capture', 'Capture photo')}
          </Button>
        </div>

        {file && <div className="text-sm text-muted-foreground break-all">{file.name}</div>}

        <section className="space-y-2">
          <label className="text-sm font-medium">{t('detect.describe', 'Or describe symptoms')}</label>
          <div className="flex gap-2">
            <Textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder={t('detect.placeholder', 'e.g., brown spots on leaves, yellowing edges, wilting')}
              className="min-h-24"
            />
            <Button variant={listening ? 'destructive' : 'secondary'} onClick={toggleListening} className="self-start">
              {listening ? <StopCircle /> : <Mic />} {listening ? t('detect.stop', 'Stop') : t('detect.speak', 'Speak')}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={analyzeText} disabled={!symptoms.trim() && !file}>{t('detect.analyze', 'Analyze')}</Button>
          </div>
        </section>

        {progress > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className={stageIndex === 0 ? 'font-medium text-foreground' : ''}>Uploading</span>
              <span>→</span>
              <span className={stageIndex === 1 ? 'font-medium text-foreground' : ''}>Analyzing</span>
              <span>→</span>
              <span className={stageIndex === 2 ? 'font-medium text-foreground' : ''}>Generating Results</span>
            </div>
            <Progress value={progress} />
          </div>
        )}

        {progress === 100 && (
          <div className="border rounded-lg p-4 grid sm:grid-cols-[auto,1fr] gap-4 items-center">
            <CircularProgress value={87} label="Confidence" />
            <div>
              <div className="text-xl font-semibold">Leaf Blight</div>
              <div className="mt-1">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted">Severity: Moderate</span>
              </div>
              <ul className="list-disc pl-5 mt-3 text-sm space-y-1">
                <li>Apply recommended fungicide (ABC) as per dosage.</li>
                <li>Remove heavily infected leaves.</li>
                <li>Improve airflow and avoid overhead watering.</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="hero">Contact Local Supplier</Button>
                <Button variant="secondary">Save Diagnosis</Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog open={cameraOpen} onOpenChange={setCameraOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>{t('detect.capture', 'Capture photo')}</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-[4/3] bg-muted rounded-md overflow-hidden">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-2/3 rounded-md border-2 border-dashed border-foreground/60" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center text-xs text-muted-foreground">
            <div className="border rounded-md p-2">
              <img src="/placeholder.svg" alt="Example of a good plant photo - centered and in focus" className="w-full h-24 object-cover rounded" loading="lazy" />
              <div className="mt-1">Good quality</div>
            </div>
            <div className="border rounded-md p-2">
              <img src="/placeholder.svg" alt="Example of a bad plant photo - blurry or too far" className="w-full h-24 object-cover rounded" loading="lazy" />
              <div className="mt-1">Poor quality</div>
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <DialogFooter>
            <Button variant="secondary" onClick={() => setCameraOpen(false)}>{t('common.cancel', 'Cancel')}</Button>
            <Button onClick={capturePhoto}><Camera /> {t('detect.takePhoto', 'Take photo')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
