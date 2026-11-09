import { cn } from '@/utils'

export interface SectionTitleProps {
  number?: string
  badge?: string
  title: string
  highlight?: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  number,
  badge,
  title,
  highlight,
  description,
  align = 'left',
  className = '',
}) => {
  return (
    <div
      className={cn(
        'max-w-3xl mb-12 sm:mb-16',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {(number || badge) && (
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs tracking-wider uppercase text-[#15803D] dark:text-[#4ADE80] font-semibold">
            {number && badge ? `${number} · ${badge}` : (number || badge)}
          </span>
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
        {title}{' '}
        {highlight && (
          <span className="text-[#15803D] dark:text-[#22C55E]">
            {highlight}
          </span>
        )}
      </h2>

      {description && (
        <p className="mt-2.5 text-sm sm:text-base text-[#334155] dark:text-[#94A3B8] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionTitle
