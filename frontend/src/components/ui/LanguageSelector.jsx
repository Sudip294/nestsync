import React, { useState, useEffect } from 'react';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'bn', label: 'Bengali' },
  { code: 'te', label: 'Telugu' },
  { code: 'mr', label: 'Marathi' },
  { code: 'ta', label: 'Tamil' },
  { code: 'gu', label: 'Gujarati' },
  { code: 'kn', label: 'Kannada' },
  { code: 'ml', label: 'Malayalam' },
  { code: 'or', label: 'Odia' },
  { code: 'pa', label: 'Punjabi' },
  { code: 'as', label: 'Assamese' },
  { code: 'ur', label: 'Urdu' }
];

const LanguageSelector = ({ className }) => {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z]+)/);
    if (match && match[1]) {
      setCurrentLang(match[1]);
    }
  }, []);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setCurrentLang(lang);
    
    // Set google translate cookie manually for robust fallback
    document.cookie = `googtrans=/en/${lang}; path=/`;
    
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      window.location.reload();
    }
  };

  return (
    <select 
      value={currentLang}
      onChange={handleLanguageChange} 
      translate="no"
      className={`notranslate bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200 outline-none cursor-pointer focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-sm ${className || ''}`}
    >
      {languages.map(lang => (
        <option key={lang.code} value={lang.code} translate="no" className="notranslate bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          {lang.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
