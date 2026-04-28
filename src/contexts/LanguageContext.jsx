import React, { createContext, useContext, useState, useEffect } from 'react';
import { t as translate } from '../utils/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem('pos_language') || 'id');

  useEffect(() => {
    localStorage.setItem('pos_language', lang);
  }, [lang]);

  const t = (key) => translate(lang, key);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
