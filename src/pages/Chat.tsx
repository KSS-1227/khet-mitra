import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Menu, Mic, Send } from 'lucide-react';
import { setPageMeta } from '@/lib/seo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

 // Using plain JS, keep the same structure via JSDoc (optional)
 /** @typedef {{ role: 'user' | 'assistant', content: string }} ChatMessage */

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'नमस्ते! How can I help your farm today?' },
  ]);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCropForm, setShowCropForm] = useState(false);
  const [cropForm, setCropForm] = useState({ temperature: '', humidity: '', ph: '', rainfall: '' });
  const [formError, setFormError] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    setPageMeta({ title: 'Assistant | AI Agriculture Portal', description: 'Chat with the virtual agriculture assistant', canonical: location.href });
  }, []);

  useEffect(() => {
    // Persist current chat locally
    try {
      localStorage.setItem('chat_messages', JSON.stringify(messages));
    } catch {}
    // Auto-scroll to bottom
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    // Restore last chat if available
    try {
      const raw = localStorage.getItem('chat_messages');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) setMessages(parsed);
      }
    } catch {}
  }, []);

  const quickActions = ["Today's Weather", 'Market Prices', 'Crop Care', 'Recommend Crop'];

  const send = async (val?: string) => {
    const content = (val ?? text).trim();
    if (!content) return;
    setMessages((m) => [...m, { role: 'user', content }]);
    setText('');
    // If user types 'recommend crop', show the crop form
    if (content.toLowerCase() === 'recommend crop') {
      setShowCropForm(true);
      setIsTyping(false);
      return;
    }
    // If user types or selects 'Today's Weather', fetch weather info
    if (content.toLowerCase() === "today's weather") {
      setIsTyping(true);
      try {
        // Example: Use a free weather API (Open-Meteo, WeatherAPI, etc.)
        // Here, we'll use Open-Meteo for demonstration (no API key required)
        // You can update the latitude/longitude as needed
        const lat = 28.6139; // Example: New Delhi
        const lon = 77.2090;
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        if (!weatherRes.ok) throw new Error('Failed to fetch weather');
        const weatherData = await weatherRes.json();
        const w = weatherData.current_weather;
        const weatherMsg = w ? (
          <>
            Today's weather: <br />
            Temperature :  {w.temperature}°C <br />
            Wind Speed : {w.windspeed} km/h <br />
            Weather Code : {w.weathercode}
          </>
        ) : (
          <>Weather data not available.</>
        );
        setMessages((m) => [
          ...m,
          { role: 'assistant', content: weatherMsg },
        ]);
      } catch (err) {
        setMessages((m) => [
          ...m,
          { role: 'assistant', content: 'Sorry, could not fetch weather information.' },
        ]);
      }
      setIsTyping(false);
      return;
    }
    setIsTyping(true);
    // Simulated assistant response
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: `Got it. Here is a quick update for: ${content}` },
      ]);
      setIsTyping(false);
    }, 800);
  };

  const handleCropFormChange = (e) => {
    setCropForm({ ...cropForm, [e.target.name]: e.target.value });
  };

  const handleCropFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setIsTyping(true);
    try {
  const response = await fetch('http://127.0.0.1:5001/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          features: [
            parseFloat(cropForm.temperature),
            parseFloat(cropForm.humidity),
            parseFloat(cropForm.ph),
            parseFloat(cropForm.rainfall)
          ]
        })
      });
      if (!response.ok) throw new Error('Prediction failed');
      const data = await response.json();
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: `Recommended crop: ${data.prediction}` },
      ]);
      setShowCropForm(false);
      setCropForm({ temperature: '', humidity: '', ph: '', rainfall: '' });
    } catch (err) {
      setFormError('Error: ' + err.message);
    }
    setIsTyping(false);
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: 'New chat started. Ask me anything about your crops.' }]);
    setText('');
    setIsTyping(false);
  };

  return (
    <div className="space-y-3">
      {/* Header with history and language switcher */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open chat history">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Chat History</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-2">
                <div className="text-sm text-muted-foreground">This session is saved locally on your device.</div>
                <div className="border rounded-md p-3 max-h-[60vh] overflow-auto space-y-2">
                  {messages.map((m, i) => (
                    <div key={i} className="text-sm">
                      <span className="font-medium mr-1">{m.role === 'user' ? 'You:' : 'AI:'}</span>
                      <span className="text-muted-foreground">{m.content}</span>
                    </div>
                  ))}
                </div>
                <Button variant="secondary" onClick={clearChat}>New Chat</Button>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-2xl font-semibold">Assistant</h1>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Messages list */}
      <div ref={listRef} className="h-[55vh] border rounded-lg p-3 overflow-y-auto space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'assistant' ? 'flex items-end gap-2' : 'flex justify-end'}>
            {m.role === 'assistant' && (
              <Avatar className="size-7">
                <AvatarFallback className="text-[10px]">AI</AvatarFallback>
              </Avatar>
            )}
            <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.role === 'user' ? 'ml-auto chat-bubble-user' : 'chat-bubble-ai'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {showCropForm && (
          <form onSubmit={handleCropFormSubmit} className="bg-muted rounded-lg p-4 space-y-2 max-w-md mx-auto">
            <div className="font-semibold mb-2">Enter details for crop recommendation:</div>
            <div className="flex gap-2">
              <input type="number" name="temperature" value={cropForm.temperature} onChange={handleCropFormChange} placeholder="Temperature (°C)" required className="border rounded px-2 py-1 w-1/4" />
              <input type="number" name="humidity" value={cropForm.humidity} onChange={handleCropFormChange} placeholder="Humidity (%)" required className="border rounded px-2 py-1 w-1/4" />
              <input type="number" name="ph" value={cropForm.ph} onChange={handleCropFormChange} placeholder="pH" required className="border rounded px-2 py-1 w-1/4" />
              <input type="number" name="rainfall" value={cropForm.rainfall} onChange={handleCropFormChange} placeholder="Rainfall (mm)" required className="border rounded px-2 py-1 w-1/4" />
            </div>
            {formError && <div className="text-red-500 text-xs">{formError}</div>}
            <div className="flex gap-2 mt-2">
              <button type="submit" className="bg-primary text-white px-3 py-1 rounded">Get Recommendation</button>
              <button type="button" className="bg-gray-300 px-3 py-1 rounded" onClick={() => { setShowCropForm(false); setCropForm({ temperature: '', humidity: '', ph: '', rainfall: '' }); }}>Cancel</button>
            </div>
          </form>
        )}
        {isTyping && (
          <div className="flex items-center gap-2">
            <Avatar className="size-7">
              <AvatarFallback className="text-[10px]">AI</AvatarFallback>
            </Avatar>
            <div className="rounded-2xl px-3 py-2 bg-muted text-muted-foreground text-xs">
              <div className="flex items-center gap-1">
                <span>AI is thinking</span>
                <span className="typing-dot" />
                <span className="typing-dot" style={{ animationDelay: '0.15s' }} />
                <span className="typing-dot" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-2">
        {quickActions.map((q) => (
          <Button key={q} variant="secondary" size="sm" onClick={() => send(q)}>
            {q}
          </Button>
        ))}
      </div>

      {/* Composer */}
      <div className="flex items-center gap-2">
        <Button variant="secondary" className="shrink-0" aria-label="Voice input">
          <Mic />
        </Button>
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your question..." />
        <Button onClick={() => send()} aria-label="Send"><Send /></Button>
      </div>
    </div>
  );
}
