import { Card } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { cn } from '@/utils'

export interface SkillGroup {
  category: string
  description?: string
  items: string[]
}

export interface SkillCardProps {
  skillGroup: SkillGroup
  number?: string
  className?: string
}

export const SkillCard: React.FC<SkillCardProps> = ({ skillGroup, number, className = '' }) => {
  return (
    <Card hoverEffect className={cn('p-5 sm:p-6 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs flex flex-col justify-between group transition-colors', className)}>
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#1F2937]">
          <h4 className="font-heading text-base font-bold text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#15803D] dark:group-hover:text-[#4ADE80] transition-colors">
            {skillGroup.category}
          </h4>

          {number && (
            <span className="font-mono text-xs font-semibold text-[#15803D] dark:text-[#4ADE80]">
              [{number}]
            </span>
          )}
        </div>

        {skillGroup.description && (
          <p className="text-xs sm:text-sm text-[#334155] dark:text-[#94A3B8] mt-3 leading-relaxed">
            {skillGroup.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5 mt-4">
          {skillGroup.items.map((item) => (
            <Badge key={item} size="sm" variant="secondary" className="rounded-[4px] text-[11px] dark:bg-[#1E293B] dark:text-[#E2E8F0]">
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default SkillCard
