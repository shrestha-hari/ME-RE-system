import { useEffect, useCallback, type ReactNode } from 'react'
import { Button } from '@/components/Button'
import { X } from '@/assets/icons'
import { cn } from '@/utils'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: ReactNode
  description?: string
  size?: ModalSize
  children: ReactNode
  className?: string
  showCloseButton?: boolean
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw] h-[90vh]',
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  children,
  className = '',
  showCloseButton = true,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0F172A]/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
      />

      {/* Modal Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'relative z-10 w-full max-h-[88vh] sm:max-h-[84vh] rounded-[12px] bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] shadow-[0_16px_40px_rgba(15,23,42,0.18)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col transition-all animate-in zoom-in-95 duration-150',
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4 border-b border-[#E5E7EB] dark:border-[#1F2937] shrink-0 bg-white dark:bg-[#111827]">
            <div className="min-w-0 pr-4">
              {title && (
                <h3 className="font-heading text-lg font-bold text-[#111827] dark:text-[#F9FAFB] truncate">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5 truncate">
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 h-auto text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-[#F9FAFB]"
              >
                <X className="size-5" />
              </Button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 text-[#374151] dark:text-[#E2E8F0]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
