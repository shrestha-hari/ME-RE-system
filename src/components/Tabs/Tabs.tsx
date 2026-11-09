import { Badge } from '@/components/Badge'
import { cn } from '@/utils'

export interface TabItem {
  id: string
  label: string
  count?: number
}

export interface TabsProps {
  tabs: TabItem[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex items-center gap-1 p-1 rounded-[8px] bg-[#F5F7F6] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#374151] shrink-0 transition-colors',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[6px] text-xs sm:text-sm font-medium transition-all duration-150 whitespace-nowrap cursor-pointer',
              isActive
                ? 'bg-white dark:bg-[#111827] text-[#166534] dark:text-[#4ADE80] font-semibold shadow-xs border border-[#E5E7EB] dark:border-[#374151]'
                : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-[#F9FAFB] hover:bg-white/50 dark:hover:bg-[#111827]/50'
            )}
          >
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && (
              <Badge
                size="sm"
                variant={isActive ? 'primary' : 'secondary'}
                className="text-[10px] px-1.5 py-0 font-bold dark:bg-[#0F172A]"
              >
                {tab.count}
              </Badge>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default Tabs
