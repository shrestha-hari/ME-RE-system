import { useUIStore } from '../store/useUIStore'
import { translations, type TranslationDictionary, type Language } from './translations'

export function useTranslation() {
  const language = useUIStore((state) => state.language)
  const toggleLanguage = useUIStore((state) => state.toggleLanguage)
  const setLanguage = useUIStore((state) => state.setLanguage)

  const t: TranslationDictionary = translations[language] || translations.en

  return {
    t,
    language,
    toggleLanguage,
    setLanguage,
    isNepali: language === 'ne',
  }
}

export { translations }
export type { Language, TranslationDictionary }
