import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { SupportedLanguage } from '../data/translations';
import { TRANSLATIONS } from '../data/translations';
import { sarvamService } from '../services/rag/SarvamService';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
  translateWithSarvam: (text: string) => Promise<string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('hh_goa_lang') as SupportedLanguage;
    return saved || 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('hh_goa_lang', lang);
  };

  const t = (key: string): string => {
    const activeDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (activeDict[key]) {
      return activeDict[key];
    }
    return TRANSLATIONS.en[key] || key;
  };

  /**
   * Perform live translation via Sarvam AI API (mayura:v1)
   */
  const translateWithSarvam = async (text: string): Promise<string> => {
    if (language === 'en') return text;

    const sarvamResult = await sarvamService.translateText(text, language);
    if (sarvamResult) {
      return sarvamResult;
    }

    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateWithSarvam }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
