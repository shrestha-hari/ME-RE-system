import { create } from 'zustand'

export type ThemeMode = 'light' | 'dark'
export type Language = 'en' | 'ne'

interface UIState {
  theme: ThemeMode
  language: Language
  mobileMenuOpen: boolean
  activeSection: string
  contactModalOpen: boolean
  selectedProjectCategory: string
  searchQuery: string
  toggleTheme: () => void
  setTheme: (theme: ThemeMode) => void
  toggleLanguage: () => void
  setLanguage: (lang: Language) => void
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  openMobileMenu: () => void
  setActiveSection: (section: string) => void
  setContactModalOpen: (open: boolean) => void
  setSelectedProjectCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  resetFilters: () => void
}

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en'
  const stored = localStorage.getItem('mer_lang') as Language | null
  if (stored === 'en' || stored === 'ne') {
    return stored
  }
  return 'en'
}

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('mer_theme') as ThemeMode | null
  if (stored === 'light' || stored === 'dark') {
    return stored
  }
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

const applyThemeToDOM = (theme: ThemeMode) => {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
    document.body?.classList.add('dark')
    root.setAttribute('data-theme', 'dark')
  } else {
    root.classList.remove('dark')
    document.body?.classList.remove('dark')
    root.setAttribute('data-theme', 'light')
  }
  try {
    localStorage.setItem('mer_theme', theme)
  } catch {
    // Ignore storage errors in restricted contexts
  }
}

// Initial application
if (typeof window !== 'undefined') {
  applyThemeToDOM(getInitialTheme())
}

export const useUIStore = create<UIState>((set) => {
  const initialTheme = getInitialTheme()
  const initialLang = getInitialLanguage()
  return {
    theme: initialTheme,
    language: initialLang,
    mobileMenuOpen: false,
    activeSection: 'home',
    contactModalOpen: false,
    selectedProjectCategory: 'All',
    searchQuery: '',

    toggleTheme: () =>
      set((state) => {
        const nextTheme = state.theme === 'light' ? 'dark' : 'light'
        applyThemeToDOM(nextTheme)
        return { theme: nextTheme }
      }),

    setTheme: (theme) => {
      applyThemeToDOM(theme)
      set({ theme })
    },

    toggleLanguage: () =>
      set((state) => {
        const nextLang: Language = state.language === 'en' ? 'ne' : 'en'
        try {
          localStorage.setItem('mer_lang', nextLang)
        } catch {
          // ignore
        }
        return { language: nextLang }
      }),

    setLanguage: (language: Language) => {
      try {
        localStorage.setItem('mer_lang', language)
      } catch {
        // ignore
      }
      set({ language })
    },

    toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
    closeMobileMenu: () => set({ mobileMenuOpen: false }),
    openMobileMenu: () => set({ mobileMenuOpen: true }),
    setActiveSection: (section: string) => set({ activeSection: section }),
    setContactModalOpen: (open: boolean) => set({ contactModalOpen: open }),
    setSelectedProjectCategory: (category: string) => set({ selectedProjectCategory: category }),
    setSearchQuery: (query: string) => set({ searchQuery: query }),
    resetFilters: () => set({ selectedProjectCategory: 'All', searchQuery: '' }),
  }
})

export default useUIStore
