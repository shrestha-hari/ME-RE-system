import { Card, CardContent, CardFooter } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { MapPin, ArrowRight, CheckCircle2 } from '@/assets/icons'
import { cn } from '@/utils'

export interface ProjectItem {
  id: string
  number?: string
  title: string
  category: string
  tagline: string
  description: string
  overview?: string
  pipeline?: string[]
  metrics?: string[]
  tags: string[]
  image?: string
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  location?: string
  price?: string
  status?: string
}

export interface ProjectCardProps {
  project: ProjectItem
  className?: string
  onOpenDetails?: (project: ProjectItem) => void
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  className = '',
  onOpenDetails,
}) => {
  return (
    <Card hoverEffect className={cn('flex flex-col h-full overflow-hidden bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] group transition-colors shadow-xs', className)}>
      {/* Thumbnail with Overlay */}
      {project.image && (
        <div
          className="relative w-full h-48 sm:h-52 overflow-hidden bg-[#F1F5F9] dark:bg-[#1E293B] border-b border-[#E2E8F0] dark:border-[#1F2937] cursor-pointer"
          onClick={() => onOpenDetails?.(project)}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none'
            }}
          />

          {/* View Details Hover Overlay */}
          <div className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <span className="text-xs font-semibold text-white px-3 py-1.5 rounded-[4px] bg-white/20 border border-white/30 backdrop-blur-md shadow-xs">
              View Plot Specs
            </span>
          </div>

          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
            {project.number && (
              <Badge size="sm" variant="secondary" className="bg-[#0F172A] text-white border-transparent rounded-[4px] text-[11px]">
                {project.number}
              </Badge>
            )}
            <Badge size="sm" variant="outline" className="bg-white/95 dark:bg-[#111827]/95 text-[#0F172A] dark:text-[#F8FAFC] border-[#E2E8F0] dark:border-[#374151] rounded-[4px] text-[11px]">
              {project.category}
            </Badge>
          </div>

          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
            {project.featured && (
              <Badge size="sm" variant="primary" dot className="shadow-xs rounded-[4px] text-[11px]">
                HOT PLOT
              </Badge>
            )}
            {project.status && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-black/75 text-white font-semibold backdrop-blur-xs">
                {project.status}
              </span>
            )}
          </div>

          {project.price && (
            <div className="absolute bottom-2.5 left-2.5 z-10">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-[4px] bg-[#15803D] text-white shadow-xs">
                {project.price}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <CardContent className="flex-1 pt-4 pb-3">
        <h3
          className={cn(
            'font-heading text-base font-bold text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#15803D] dark:group-hover:text-[#4ADE80] transition-colors leading-snug',
            onOpenDetails && 'cursor-pointer'
          )}
          onClick={() => onOpenDetails?.(project)}
        >
          {project.title}
        </h3>

        <p className="text-xs font-medium text-[#15803D] dark:text-[#4ADE80] mt-1 font-mono">
          {project.tagline}
        </p>

        <p className="text-xs sm:text-sm text-[#334155] dark:text-[#94A3B8] mt-2.5 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Quantifiable Highlights */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-3 space-y-1.5 py-2 px-2.5 rounded-[6px] bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#374151]">
            {project.metrics.map((metric, i) => (
              <div key={i} className="text-xs text-[#334155] dark:text-[#E2E8F0] flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-[#15803D] dark:text-[#4ADE80] shrink-0" />
                <span>{metric}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3.5">
          {project.tags.map((tag) => (
            <Badge key={tag} size="sm" variant="outline" className="dark:border-[#374151] dark:text-[#94A3B8] rounded-[4px] text-[11px]">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="pt-3 pb-3.5 border-t border-[#E2E8F0] dark:border-[#1F2937]">
        <div className="flex items-center gap-2 w-full justify-between">
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 px-2.5 text-xs rounded-[6px]"
                  leftIcon={<MapPin className="size-3 text-[#15803D] dark:text-[#4ADE80]" />}
                >
                  Map View
                </Button>
              </a>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2.5 text-xs rounded-[6px]"
              onClick={(e) => {
                e.stopPropagation()
                onOpenDetails?.(project)
              }}
            >
              Specs
            </Button>
          </div>

          <a
            href="#contact"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation()
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="ml-auto"
          >
            <Button
              variant="primary"
              size="sm"
              className="h-8 px-3 text-xs font-semibold rounded-[6px]"
              rightIcon={<ArrowRight className="size-3" />}
            >
              Book Visit
            </Button>
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProjectCard
