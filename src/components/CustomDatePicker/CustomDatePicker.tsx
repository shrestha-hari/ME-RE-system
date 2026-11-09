import { useState, useRef, useEffect, useMemo } from 'react'
import { Calendar, ChevronLeft, ChevronRight, X } from '@/assets/icons'
import { cn } from '@/utils'

export interface CustomDatePickerProps {
  value: string // YYYY-MM-DD
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  helperText?: string
  error?: string
  disabled?: boolean
  className?: string
  id?: string
  minDate?: string // YYYY-MM-DD
  maxDate?: string // YYYY-MM-DD
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = 'Select date (YYYY-MM-DD)...',
  helperText,
  error,
  disabled = false,
  className = '',
  id,
  minDate,
  maxDate,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Current view month & year
  const initialDate = useMemo(() => {
    if (value && !isNaN(new Date(value).getTime())) {
      return new Date(value)
    }
    return new Date()
  }, [value])

  const [viewYear, setViewYear] = useState<number>(initialDate.getFullYear())
  const [viewMonth, setViewMonth] = useState<number>(initialDate.getMonth())
  const [prevValue, setPrevValue] = useState(value)

  // Keep view aligned if value changes externally
  if (value !== prevValue) {
    setPrevValue(value)
    if (value && !isNaN(new Date(value).getTime())) {
      const d = new Date(value)
      setViewYear(d.getFullYear())
      setViewMonth(d.getMonth())
    }
  }

  // Click outside listener
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

  // Calendar matrix calculations
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate()

    const days: Array<{
      dateString: string
      dayNumber: number
      isCurrentMonth: boolean
      isDisabled: boolean
      isSelected: boolean
      isToday: boolean
    }> = []

    const todayStr = new Date().toISOString().split('T')[0]

    // Previous month padding
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i
      const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1
      const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear
      const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
      days.push({
        dateString: dateStr,
        dayNumber: dayNum,
        isCurrentMonth: false,
        isDisabled: true,
        isSelected: value === dateStr,
        isToday: todayStr === dateStr,
      })
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      let isDisabled = false
      if (minDate && dateStr < minDate) isDisabled = true
      if (maxDate && dateStr > maxDate) isDisabled = true

      days.push({
        dateString: dateStr,
        dayNumber: day,
        isCurrentMonth: true,
        isDisabled,
        isSelected: value === dateStr,
        isToday: todayStr === dateStr,
      })
    }

    // Next month padding (complete 42 cells grid: 6 rows of 7)
    const remaining = 42 - days.length
    for (let day = 1; day <= remaining; day++) {
      const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1
      const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear
      const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      days.push({
        dateString: dateStr,
        dayNumber: day,
        isCurrentMonth: false,
        isDisabled: true,
        isSelected: value === dateStr,
        isToday: todayStr === dateStr,
      })
    }

    return days
  }, [viewYear, viewMonth, value, minDate, maxDate])

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const handleSelectDay = (dateStr: string) => {
    onChange(dateStr)
    setIsOpen(false)
  }

  const handleSelectToday = () => {
    const todayStr = new Date().toISOString().split('T')[0]
    onChange(todayStr)
    setViewYear(new Date().getFullYear())
    setViewMonth(new Date().getMonth())
    setIsOpen(false)
  }

  const handleClear = () => {
    onChange('')
    setIsOpen(false)
  }

  const pickerId = id || (label ? `datepicker-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)

  // Format readable display value
  const displayFormatted = useMemo(() => {
    if (!value) return ''
    try {
      const [y, m, d] = value.split('-').map(Number)
      if (y && m && d) {
        return `${MONTH_NAMES[m - 1]} ${d}, ${y}`
      }
      return value
    } catch {
      return value
    }
  }, [value])

  return (
    <div className={cn('relative w-full space-y-1.5', className)} ref={containerRef}>
      {label && (
        <span
          id={pickerId ? `${pickerId}-label` : undefined}
          className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#374151] dark:text-[#D1D5DB]"
        >
          {label}
        </span>
      )}

      {/* Styled Trigger Control Button */}
      <button
        type="button"
        id={pickerId}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-labelledby={label && pickerId ? `${pickerId}-label ${pickerId}` : undefined}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          'w-full h-10 px-3 rounded-[6px] border bg-white dark:bg-[#1E293B] text-sm text-[#0F172A] dark:text-[#F8FAFC] text-left flex items-center justify-between transition-all duration-150 focus:outline-none cursor-pointer',
          error
            ? 'border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/15'
            : 'border-[#CBD5E1] dark:border-[#374151] focus:ring-2 focus:ring-[#15803D]/15 focus:border-[#15803D] dark:focus:border-[#22C55E]',
          disabled && 'opacity-60 cursor-not-allowed bg-[#F1F5F9] dark:bg-[#0F172A] text-[#94A3B8]',
          isOpen && 'border-[#15803D] dark:border-[#22C55E] ring-2 ring-[#15803D]/15'
        )}
      >
        <div className="flex items-center gap-2.5 truncate">
          <Calendar className="size-4 text-[#15803D] dark:text-[#4ADE80] shrink-0" />
          <span className={cn('truncate', !value && 'text-[#94A3B8]')}>
            {displayFormatted || placeholder}
          </span>
        </div>

        {value && !disabled && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation()
              handleClear()
            }}
            className="p-1 rounded hover:bg-[#F1F5F9] dark:hover:bg-[#334155] text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] transition-colors"
            title="Clear date"
          >
            <X className="size-3.5" />
          </span>
        )}
      </button>

      {/* Interactive Popup Calendar */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Date picker"
          className="absolute z-50 mt-1 w-72 rounded-[8px] border border-[#E2E8F0] dark:border-[#374151] bg-white dark:bg-[#111827] p-3 shadow-md ring-1 ring-black/5 animate-in fade-in-50 zoom-in-95"
        >
          {/* Calendar Header with Month/Year Navigation */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[#E2E8F0] dark:border-[#1F2937]">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 rounded-[4px] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] text-[#334155] dark:text-[#94A3B8] transition-colors cursor-pointer"
              title="Previous month"
            >
              <ChevronLeft className="size-4" />
            </button>

            <span className="font-heading text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 rounded-[4px] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] text-[#334155] dark:text-[#94A3B8] transition-colors cursor-pointer"
              title="Next month"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 mt-2 text-center">
            {DAYS_OF_WEEK.map((d) => (
              <span
                key={d}
                className="text-[10px] font-mono uppercase text-[#64748B] dark:text-[#94A3B8] py-0.5 font-semibold"
              >
                {d}
              </span>
            ))}
          </div>

          {/* Date cells grid */}
          <div className="grid grid-cols-7 gap-1 mt-1">
            {calendarDays.map((cell, idx) => (
              <button
                key={idx}
                type="button"
                disabled={cell.isDisabled}
                onClick={() => handleSelectDay(cell.dateString)}
                className={cn(
                  'h-8 w-8 mx-auto flex items-center justify-center rounded-[4px] text-xs font-medium transition-colors cursor-pointer',
                  cell.isSelected &&
                    'bg-[#15803D] dark:bg-[#22C55E] text-white font-bold shadow-xs',
                  !cell.isSelected &&
                    cell.isCurrentMonth &&
                    'text-[#0F172A] dark:text-[#F8FAFC] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B]',
                  !cell.isSelected &&
                    !cell.isCurrentMonth &&
                    'text-[#94A3B8] dark:text-[#475569] opacity-40 cursor-not-allowed',
                  cell.isToday &&
                    !cell.isSelected &&
                    'border border-[#15803D] dark:border-[#4ADE80] font-bold text-[#15803D] dark:text-[#4ADE80]',
                  cell.isDisabled && 'opacity-30 cursor-not-allowed hover:bg-transparent'
                )}
              >
                {cell.dayNumber}
              </button>
            ))}
          </div>

          {/* Bottom Action Footer */}
          <div className="mt-2.5 pt-2 border-t border-[#E2E8F0] dark:border-[#1F2937] flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={handleSelectToday}
              className="text-xs font-mono font-medium text-[#15803D] dark:text-[#4ADE80] hover:underline cursor-pointer"
            >
              Today
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {error ? (
        <p className="text-xs font-medium text-[#DC2626]">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">{helperText}</p>
      ) : null}
    </div>
  )
}

export default CustomDatePicker

