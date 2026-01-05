export type Language = 'zh' | 'en';

export interface LogoRequest {
  subject: string;
  text: string;
  style: LogoStyleKey;
}

export type LogoStyleKey = 'ESPORT' | 'MINIMAL' | 'MASCOT' | 'EMBLEM';

export interface LogoStyle {
  id: LogoStyleKey;
  label: {
    zh: string;
    en: string;
  };
  promptSuffix: string; // Prompts are always in English for the model
  description: {
    zh: string;
    en: string;
  };
  icon: string;
}

export interface GenerationResult {
  imageUrl: string | null;
  loading: boolean;
  error: string | null;
  processing: boolean; // For post-processing like bg removal
}

export interface Template {
  subject: string;
  text: string;
  style: LogoStyleKey;
}
