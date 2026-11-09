import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from '@/assets/icons'
import { cn } from '@/utils'

export interface SelectOption {
  value: string
  label: string
  description?: string
}

export interface SelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  helperText?: string
  error?: string
  disabled?: boolean
  className?: string
  id?: string
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select an option...',
  helperText,
  error,
  disabled = false,
  className = '',
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)

  return (
    <div className={cn('relative w-full space-y-1.5', className)} ref={containerRef}>
      {label && (
        <span
          id={selectId ? `${selectId}-label` : undefined}
          className="block text-xs font-semibold text-[#0F172A] dark:text-[#E2E8F0]"
        >
          {label}
        </span>
      )}

      <button
        type="button"
        id={selectId}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label && selectId ? `${selectId}-label ${selectId}` : undefined}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          'w-full h-10 px-3 rounded-[6px] border bg-white dark:bg-[#1E293B] text-sm text-[#0F172A] dark:text-[#F8FAFC] text-left flex items-center justify-between transition-all duration-150 focus:outline-none cursor-pointer',
          error
            ? 'border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/15'
            : 'border-[#CBD5E1] dark:border-[#334155] focus:ring-2 focus:ring-[#15803D]/15 focus:border-[#15803D] dark:focus:border-[#22C55E]',
          disabled && 'opacity-60 cursor-not-allowed bg-[#F1F5F9] dark:bg-[#0F172A] text-[#94A3B8]',
          isOpen && 'border-[#15803D] dark:border-[#22C55E] ring-2 ring-[#15803D]/15'
        )}
      >
        <span className={cn('truncate', !selectedOption && 'text-[#94A3B8]')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            'size-4 text-[#64748B] dark:text-[#94A3B8] transition-transform duration-200 shrink-0 ml-2',
            isOpen && 'rotate-180 text-[#15803D] dark:text-[#4ADE80]'
          )}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-[6px] border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-1 text-sm shadow-md ring-1 ring-black/5 focus:outline-none animate-in fade-in-50 zoom-in-95"
        >
          {options.map((option) => {
            const isSelected = option.value === value
            return (
              <div
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={cn(
                  'relative flex items-center justify-between rounded-[4px] px-2.5 py-1.5 text-xs sm:text-sm text-[#0F172A] dark:text-[#F8FAFC] cursor-pointer select-none transition-colors',
                  isSelected
                    ? 'bg-[#DCFCE7] dark:bg-[#15803D]/20 text-[#15803D] dark:text-[#4ADE80] font-medium'
                    : 'hover:bg-[#F1F5F9] dark:hover:bg-[#334155] text-[#334155] dark:text-[#E2E8F0]'
                )}
              >
                <div className="flex flex-col">
                  <span>{option.label}</span>
                  {option.description && (
                    <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">{option.description}</span>
                  )}
                </div>
                {isSelected && <Check className="size-4 text-[#15803D] shrink-0 ml-2" />}
              </div>
            )
          })}
        </div>
      )}

      {error ? (
        <p className="text-xs font-medium text-[#DC2626]">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">{helperText}</p>
      ) : null}
    </div>
  )
}

export default Select

