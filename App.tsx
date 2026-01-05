import React, { useState } from 'react';
import { LogoRequest, Language } from './types';
import { generateLogo } from './services/api';
import { TRANSLATIONS, TEMPLATES } from './constants';
import { Input } from './components/Input';
import { StyleSelector } from './components/StyleSelector';
import { Button } from './components/Button';
import { Reactor } from './components/Reactor';
import { AlertCircle, Sparkles, Dices, Globe } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('zh');
  const t = TRANSLATIONS[lang];

  const [request, setRequest] = useState<LogoRequest>({
    subject: '',
    text: '',
    style: 'ESPORT'
  });
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleLanguage = () => {
    setLang(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const handleRandomTemplate = () => {
    const randomTemplate = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
    setRequest({
      subject: randomTemplate.subject,
      text: randomTemplate.text,
      style: randomTemplate.style
    });
    setError(null);
  };

  const handleGenerate = async () => {
    if (!request.subject.trim()) {
      setError(t.errorEmpty);
      return;
    }

    setError(null);
    setIsLoading(true);
    setLoadingStatus('准备中...');
    setGeneratedImage(null);

    try {
      const base64Image = await generateLogo(request, (status) => {
        setLoadingStatus(status);
      });
      setGeneratedImage(base64Image);
    } catch (err: any) {
      setError(t.errorGen);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveBg = () => {
    if (!generatedImage) return;
    setIsProcessing(true);
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = generatedImage;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0; 
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      setGeneratedImage(canvas.toDataURL('image/png'));
      setIsProcessing(false);
    };
  };

  return (
    // Use min-h-screen to ensure full background on mobile, but strict height on desktop
    <div className="bg-background font-sans text-foreground flex flex-col min-h-screen lg:h-screen lg:overflow-hidden">
      {/* Navbar */}
      <header className="flex-none border-b border-border bg-card/50 backdrop-blur z-50 h-16">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              E
            </div>
            <span className="font-bold text-lg tracking-tight">EdgeCraft <span className="text-muted-foreground font-normal">Turbo</span></span>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground">
               <span>v2.5</span>
               <span className="px-2 py-1 rounded bg-secondary text-secondary-foreground text-xs">Beta</span>
             </div>
             
             <button 
               onClick={toggleLanguage}
               className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md hover:bg-secondary transition-colors"
             >
               <Globe className="w-4 h-4" />
               <span>{lang === 'zh' ? 'English' : '中文'}</span>
             </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1800px] mx-auto lg:h-[calc(100vh-64px)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-6 h-full">
          
          {/* LEFT: Configuration Panel */}
          {/* On Desktop: Scrollable vertically if content is too long for the laptop screen */}
          <div className="col-span-1 lg:col-span-4 flex flex-col h-auto lg:h-full lg:overflow-hidden">
            <div className="flex flex-col h-full gap-6 lg:overflow-y-auto lg:pr-2 custom-scrollbar pb-10 lg:pb-0">
                <div className="space-y-1 flex-none">
                  <h1 className="text-2xl font-bold tracking-tight">{t.title}</h1>
                  <p className="text-muted-foreground text-sm">{t.subtitle}</p>
                  <p className="text-xs text-muted-foreground pt-1">
                    {t.desc}
                  </p>
                </div>

                <div className="flex-1 space-y-5 bg-card p-5 rounded-xl border border-border shadow-sm flex flex-col">
                  
                  <div className="flex justify-end flex-none">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="h-7 text-xs gap-1.5"
                      onClick={handleRandomTemplate}
                    >
                      <Dices className="w-3.5 h-3.5" />
                      {t.lucky}
                    </Button>
                  </div>

                  <div className="space-y-5 flex-1">
                    <Input 
                      label={t.subjectLabel}
                      placeholder={t.subjectPlaceholder}
                      helperText={t.subjectHelper}
                      value={request.subject}
                      onChange={(e) => setRequest({ ...request, subject: e.target.value })}
                    />

                    <Input 
                      label={t.textLabel} 
                      placeholder={t.textPlaceholder} 
                      helperText={t.textHelper}
                      value={request.text}
                      onChange={(e) => setRequest({ ...request, text: e.target.value })}
                    />

                    <StyleSelector 
                      label={t.styleSectionTitle}
                      selected={request.style} 
                      onChange={(s) => setRequest({ ...request, style: s })} 
                      lang={lang}
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-center gap-2 text-destructive text-sm flex-none">
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="pt-2 sticky bottom-0 bg-card z-10 flex-none">
                    <Button 
                      className="w-full h-10 text-sm shadow-lg shadow-primary/20" 
                      onClick={handleGenerate} 
                      isLoading={isLoading}
                      icon={<Sparkles className="w-4 h-4 mr-1" />}
                    >
                      {isLoading ? loadingStatus : t.generate}
                    </Button>
                  </div>
                </div>
                
                <div className="text-[10px] text-center text-muted-foreground flex-none">
                  {t.poweredBy}
                </div>
            </div>
          </div>

          {/* RIGHT: Preview Panel */}
          {/* On Mobile: Fixed height to show it exists. On Desktop: Fill remaining height. */}
          <div className="col-span-1 lg:col-span-8 flex flex-col h-[500px] lg:h-full pb-6 lg:pb-0">
            <div className="h-full bg-card rounded-xl border border-border shadow-sm p-4 md:p-6 flex flex-col overflow-hidden">
              <Reactor 
                imageSrc={generatedImage} 
                isLoading={isLoading}
                loadingStatus={loadingStatus}
                onRemoveBg={handleRemoveBg}
                isProcessing={isProcessing}
                texts={{
                  preview: t.preview,
                  removeBg: t.removeBg,
                  save: t.save,
                  generating: t.generating,
                  ready: t.ready
                }}
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
