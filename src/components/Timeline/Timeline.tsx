import { Card } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { Briefcase, ArrowRight } from '@/assets/icons'
import { cn } from '@/utils'

export interface ExperienceItem {
  id: string
  number?: string
  role: string
  company: string
  location?: string
  period: string
  type?: string
  description: string
  highlights?: string[]
  technologies?: string[]
}

export interface TimelineProps {
  items: ExperienceItem[]
  className?: string
}

export const Timeline: React.FC<TimelineProps> = ({ items, className = '' }) => {
  return (
    <div className={cn('relative pl-6 sm:pl-8 border-l border-[#E2E8F0] dark:border-[#1F2937] space-y-6 sm:space-y-8 my-6', className)}>
      {items.map((item, index) => (
        <div key={item.id} className="relative group">
          {/* Timeline node */}
          <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 rounded-full border border-[#E2E8F0] dark:border-[#374151] bg-white dark:bg-[#111827] flex items-center justify-center text-[#15803D] dark:text-[#4ADE80] shadow-xs group-hover:border-[#15803D] dark:group-hover:border-[#4ADE80] transition-colors">
            <Briefcase className="size-3.5" />
          </div>

          <Card hoverEffect className="p-5 sm:p-6 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3.5 border-b border-[#E2E8F0] dark:border-[#1F2937]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge size="sm" variant="primary" className="rounded-[4px] text-[11px]">
                    0{index + 1}
                  </Badge>
                  <h4 className="font-heading text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                    {item.role}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#15803D] dark:text-[#4ADE80]">
                  {item.company} {item.location && <span className="text-[#64748B] dark:text-[#94A3B8] font-normal">· {item.location}</span>}
                </p>
              </div>

              <div className="self-start sm:self-center">
                <Badge size="sm" variant="secondary" className="rounded-[4px] text-[11px] dark:bg-[#1E293B] dark:text-[#E2E8F0]">
                  {item.period}
                </Badge>
              </div>
            </div>

            <p className="mt-3.5 text-xs sm:text-sm text-[#334155] dark:text-[#94A3B8] leading-relaxed">
              {item.description}
            </p>

            {/* Highlights */}
            {item.highlights && item.highlights.length > 0 && (
              <div className="mt-3.5 space-y-2">
                <h5 className="text-[11px] font-mono font-semibold uppercase text-[#64748B] dark:text-[#94A3B8]">
                  Key Achievements & Standards:
                </h5>
                <ul className="space-y-1.5">
                  {item.highlights.map((highlight, i) => (
                    <li key={i} className="text-xs sm:text-sm text-[#334155] dark:text-[#D1D5DB] flex items-start gap-2">
                      <ArrowRight className="size-3.5 text-[#15803D] dark:text-[#4ADE80] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies / Competencies */}
            {item.technologies && item.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[#E2E8F0] dark:border-[#1F2937]">
                {item.technologies.map((tech) => (
                  <Badge key={tech} size="sm" variant="outline" className="rounded-[4px] text-[11px] dark:border-[#374151] dark:text-[#94A3B8]">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
          </Card>
        </div>
      ))}
    </div>
  )
}

export default Timeline
