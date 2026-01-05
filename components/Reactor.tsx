import React from 'react';
import { Download, Eraser, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from './Button';

interface ReactorProps {
  imageSrc: string | null;
  isLoading: boolean;
  loadingStatus?: string;
  onRemoveBg: () => void;
  isProcessing: boolean;
  texts: {
    preview: string;
    removeBg: string;
    save: string;
    generating: string;
    ready: string;
  }
}

export const Reactor: React.FC<ReactorProps> = ({ imageSrc, isLoading, loadingStatus, onRemoveBg, isProcessing, texts }) => {
  const handleDownload = (format: 'png' | 'svg') => {
    if (!imageSrc) return;
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `edgecraft-logo.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header */}
      <div className="flex-none flex items-center justify-between">
        <h3 className="text-lg font-medium">{texts.preview}</h3>
        {imageSrc && !isLoading && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onRemoveBg} 
              isLoading={isProcessing}
              className="h-8 text-xs"
              icon={<Eraser className="w-3.5 h-3.5" />}
            >
              {texts.removeBg}
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => handleDownload('png')}
              className="h-8 text-xs"
              icon={<Download className="w-3.5 h-3.5" />}
            >
              {texts.save}
            </Button>
          </div>
        )}
      </div>

      {/* Main Canvas Area */}
      {/* flex-1 min-h-0 is crucial for nested flex scrolling/sizing to work correctly */}
      <div className="flex-1 w-full min-h-0 relative bg-secondary/30 border border-border rounded-xl overflow-hidden">
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style={{ 
               backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground)) 1px, transparent 0)`, 
               backgroundSize: '24px 24px' 
             }}>
        </div>

        {/* Content Layer */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4 animate-in fade-in duration-300">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
              </div>
              <p className="text-sm text-muted-foreground font-medium animate-pulse">{loadingStatus || texts.generating}</p>
            </div>
          ) : imageSrc ? (
             <img 
               src={imageSrc} 
               alt="Generated Logo" 
               className={`w-full h-full object-contain drop-shadow-2xl transition-all duration-500 ${isProcessing ? 'opacity-50 blur-sm' : 'opacity-100 scale-100'}`}
             />
          ) : (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <div className="p-4 rounded-full bg-secondary">
                <ImageIcon className="w-8 h-8 opacity-50" />
              </div>
              <p className="text-sm">{texts.ready}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
