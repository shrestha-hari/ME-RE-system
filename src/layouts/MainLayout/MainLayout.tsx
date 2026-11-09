import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollProgress } from '@/components/ScrollProgress'
import { BackToTop } from '@/components/BackToTop'
import { useScrollToTop } from '@/hooks'
import { useUIStore } from '@/store'
import { cn } from '@/utils'

export const MainLayout: React.FC = () => {
  // Automatically scroll to top on route change
  useScrollToTop(true)
  const { theme } = useUIStore()

  useEffect(() => {
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
  }, [theme])

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col bg-[#FAFAF9] dark:bg-[#090D16] text-[#111827] dark:text-[#F9FAFB] selection:bg-[#DCFCE7] selection:text-[#166534] dark:selection:bg-[#14532D] dark:selection:text-[#86EFAC] transition-colors duration-200',
        theme === 'dark' ? 'dark' : ''
      )}
    >
      <ScrollProgress />
      <Navbar />
      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default MainLayout
