import { useState, useEffect } from 'react'
import { Button } from '@/components/Button'
import { ChevronDown } from '@/assets/icons'
import { useScrollToTop } from '@/hooks'
import { cn } from '@/utils'

export interface BackToTopProps {
  threshold?: number
  className?: string
}

export const BackToTop: React.FC<BackToTopProps> = ({ threshold = 300, className = '' }) => {
  const [visible, setVisible] = useState(false)
  const { scrollToTop } = useScrollToTop(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  if (!visible) return null

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Scroll back to top"
      className={cn(
        'fixed bottom-6 right-6 z-40 p-2.5 rounded-[8px] bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#E2E8F0] shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:text-[#166534] dark:hover:text-[#4ADE80] hover:border-[#166534] dark:hover:border-[#22C55E] hover:-translate-y-0.5 transition-all duration-150 animate-in fade-in h-auto w-auto',
        className
      )}
    >
      <ChevronDown className="size-4 rotate-180" />
    </Button>
  )
}

export default BackToTop
