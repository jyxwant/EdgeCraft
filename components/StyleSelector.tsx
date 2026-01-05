import React from 'react';
import { LOGO_STYLES } from '../constants';
import { LogoStyleKey, Language } from '../types';
import { Zap, Component, Hexagon, Shield, CheckCircle2 } from 'lucide-react';

interface StyleSelectorProps {
  selected: LogoStyleKey;
  onChange: (style: LogoStyleKey) => void;
  lang: Language;
  label: string;
}

const Icons: Record<string, React.FC<any>> = {
  Zap, Component, Hexagon, Shield
};

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selected, onChange, lang, label }) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium leading-none">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-4">
        {Object.values(LOGO_STYLES).map((style) => {
          const Icon = Icons[style.icon];
          const isSelected = selected === style.id;
          
          return (
            <button
              key={style.id}
              onClick={() => onChange(style.id)}
              className={`relative flex flex-col items-start p-4 border rounded-xl transition-all hover:bg-accent/50 text-left
                ${isSelected 
                  ? 'border-primary bg-accent ring-1 ring-ring' 
                  : 'border-border bg-card'
                }
              `}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <Icon className={`w-5 h-5 ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`} />
                {isSelected && <CheckCircle2 className="w-4 h-4 text-primary" />}
              </div>
              <span className={`text-sm font-semibold ${isSelected ? 'text-foreground' : 'text-foreground'}`}>
                {style.label[lang]}
              </span>
              <span className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {style.description[lang]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
