import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/utils'

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'success'
  | 'warning'
  | 'danger'

export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  icon?: ReactNode
  children: ReactNode
}

const variantClasses: Record<BadgeVariant, string> = {
  primary:
    'bg-[#DCFCE7] dark:bg-[#15803D]/25 text-[#15803D] dark:text-[#4ADE80] border-[#BBF7D0] dark:border-[#14532D]',
  secondary:
    'bg-[#F1F5F9] dark:bg-[#1E293B] text-[#334155] dark:text-[#E2E8F0] border-[#E2E8F0] dark:border-[#374151]',
  outline:
    'bg-transparent text-[#334155] dark:text-[#94A3B8] border-[#E2E8F0] dark:border-[#374151]',
  success:
    'bg-[#DCFCE7] dark:bg-[#15803D]/25 text-[#16A34A] dark:text-[#4ADE80] border-[#BBF7D0] dark:border-[#14532D]',
  warning:
    'bg-[#FEF3C7] dark:bg-[#78350F]/40 text-[#D97706] dark:text-[#FCD34D] border-[#FDE68A] dark:border-[#78350F]',
  danger:
    'bg-[#FEE2E2] dark:bg-[#7F1D1D]/40 text-[#DC2626] dark:text-[#FCA5A5] border-[#FECACA] dark:border-[#7F1D1D]',
}

const dotColors: Record<BadgeVariant, string> = {
  primary: 'bg-[#15803D] dark:bg-[#4ADE80]',
  secondary: 'bg-[#64748B] dark:text-[#94A3B8]',
  outline: 'bg-[#94A3B8] dark:bg-[#64748B]',
  success: 'bg-[#16A34A] dark:bg-[#4ADE80]',
  warning: 'bg-[#D97706] dark:bg-[#FCD34D]',
  danger: 'bg-[#DC2626] dark:bg-[#FCA5A5]',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'text-[11px] px-2 py-0.5 gap-1 font-mono rounded-[4px]',
  md: 'text-xs px-2.5 py-0.5 gap-1.5 font-medium rounded-[4px]',
  lg: 'text-xs px-3 py-1 gap-2 font-semibold rounded-[4px]',
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'secondary',
  size = 'md',
  dot = false,
  icon,
  className = '',
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-medium border rounded-[6px] transition-colors',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('size-1.5 rounded-full shrink-0 animate-pulse', dotColors[variant])}
          aria-hidden="true"
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  )
}

export default Badge
