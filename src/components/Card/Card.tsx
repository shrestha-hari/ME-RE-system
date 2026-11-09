import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean
  variant?: 'surface' | 'alt' | 'outline'
  children?: ReactNode
}

export const Card: React.FC<CardProps> = ({
  className = '',
  hoverEffect = false,
  variant = 'surface',
  children,
  ...props
}) => {
  const variantStyles = {
    surface: 'bg-white dark:bg-[#111827] border-[#E2E8F0] dark:border-[#1F2937] shadow-xs',
    alt: 'bg-[#F8FAFC] dark:bg-[#1E293B] border-[#E2E8F0] dark:border-[#1F2937]',
    outline: 'bg-transparent border-[#E2E8F0] dark:border-[#1F2937]',
  }

  return (
    <div
      className={cn(
        'rounded-[8px] border transition-all duration-150',
        variantStyles[variant],
        hoverEffect &&
          'hover:border-[#CBD5E1] dark:hover:border-[#374151] hover:shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={cn('p-5 pb-2.5', className)} {...props}>
    {children}
  </div>
)

export const CardTitle: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <h3
    className={cn('text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight', className)}
    {...props}
  >
    {children}
  </h3>
)

export const CardDescription: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <p
    className={cn('text-xs sm:text-sm text-[#334155] dark:text-[#94A3B8] mt-1 leading-relaxed', className)}
    {...props}
  >
    {children}
  </p>
)

export const CardContent: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={cn('p-6 pt-0', className)} {...props}>
    {children}
  </div>
)

export const CardFooter: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div
    className={cn(
      'p-6 pt-0 flex items-center justify-between border-t border-[#E5E7EB] dark:border-[#1F2937] mt-4',
      className
    )}
    {...props}
  >
    {children}
  </div>
)

export default Card
