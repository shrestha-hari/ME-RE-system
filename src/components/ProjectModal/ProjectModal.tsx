import React from 'react'
import { Modal } from '@/components/Modal'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { MapPin, ArrowRight, CheckCircle2 } from '@/assets/icons'
import type { ProjectItem } from '@/components/ProjectCard'

export interface ProjectModalProps {
  project: ProjectItem | null
  isOpen: boolean
  onClose: () => void
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={
        <div className="flex items-center gap-2">
          {project.number && (
            <span className="font-mono text-xs font-bold text-[#166534] dark:text-[#4ADE80]">
              {project.number}
            </span>
          )}
          <span className="truncate">{project.title}</span>
        </div>
      }
      description={project.tagline}
    >
      <div className="space-y-4">
        {/* High-Resolution Land Image Display */}
        {project.image && (
          <div className="relative w-full h-44 sm:h-56 overflow-hidden rounded-[8px] bg-[#F5F7F6] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#374151]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none'
              }}
            />
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
              <Badge size="sm" variant="outline" className="bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xs text-[#111827] dark:text-[#F9FAFB] shadow-xs">
                {project.category}
              </Badge>
              {project.featured && (
                <Badge size="sm" variant="primary" dot className="shadow-xs">
                  HOT LISTING
                </Badge>
              )}
            </div>

            {project.price && (
              <div className="absolute bottom-2.5 right-2.5">
                <span className="text-xs sm:text-sm font-mono font-extrabold px-3 py-1 rounded bg-[#166534] text-white shadow-md">
                  {project.price}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Land Overview & Topography */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#166534] dark:text-[#4ADE80] font-bold mb-1.5">
            Plot Overview & Location Highlights
          </h4>
          <p className="text-xs sm:text-sm text-[#374151] dark:text-[#D1D5DB] leading-relaxed">
            {project.overview || project.description}
          </p>
        </div>

        {/* Infrastructure & Amenities */}
        {project.pipeline && project.pipeline.length > 0 && (
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#166534] dark:text-[#4ADE80] font-bold mb-2">
              Infrastructure & Colony Amenities
            </h4>
            <div className="space-y-1.5">
              {project.pipeline.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2 sm:p-2.5 rounded-[6px] bg-[#F9FAFB] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#374151]"
                >
                  <span className="font-mono text-[11px] font-bold text-[#166534] dark:text-[#4ADE80] px-1.5 py-0.5 rounded bg-[#DCFCE7] dark:bg-[#14532D]/40 shrink-0 mt-0.5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <p className="text-xs text-[#374151] dark:text-[#D1D5DB] leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Dimensions & Specifications */}
        {project.metrics && project.metrics.length > 0 && (
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#166534] dark:text-[#4ADE80] font-bold mb-2">
              Demarcated Plot Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-[6px] bg-[#F5F7F6] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#374151] text-xs font-mono text-[#374151] dark:text-[#E2E8F0]"
                >
                  <CheckCircle2 className="size-3.5 text-[#166534] dark:text-[#4ADE80] shrink-0" />
                  <span className="truncate">{metric}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feature Badges */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF] font-semibold mb-1.5">
            Key Features & Zoning
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} size="sm" variant="secondary" className="font-mono text-[11px] dark:bg-[#1E293B] dark:text-[#E2E8F0]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-[#E5E7EB] dark:border-[#1F2937] flex flex-wrap items-center justify-between gap-2.5 sticky bottom-0 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xs pb-1">
          <div className="flex flex-wrap items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<MapPin className="size-3.5 text-[#166534] dark:text-[#4ADE80]" />}
                >
                  View on Google Maps
                </Button>
              </a>
            )}

            <a
              href="#contact"
              onClick={() => {
                onClose()
                const el = document.getElementById('contact')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <Button
                variant="primary"
                size="sm"
                rightIcon={<ArrowRight className="size-3.5" />}
              >
                Book Site Inspection
              </Button>
            </a>
          </div>

          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ProjectModal
