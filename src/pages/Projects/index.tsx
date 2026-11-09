import { useState, useMemo } from 'react'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import { ProjectCard, type ProjectItem } from '@/components/ProjectCard'
import { ProjectModal } from '@/components/ProjectModal'
import { Tabs } from '@/components/Tabs'
import { Gallery } from '@/components/Gallery'
import { Seo } from '@/components/Seo'
import { projectsData } from '@/data'
import { SITE_CONFIG } from '@/utils'

export const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  const categories = useMemo(() => {
    const rawCategories = Array.from(new Set(projectsData.map((p) => p.category)))
    return [
      { id: 'All', label: 'All Land Schemes', count: projectsData.length },
      ...rawCategories.map((c) => ({
        id: c,
        label: c,
        count: projectsData.filter((p) => p.category === c).length,
      })),
    ]
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projectsData
    return projectsData.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="w-full flex-1 py-10 sm:py-14 bg-[#F8FAFC] dark:bg-[#090D16] transition-colors">
      <Seo
        title="Properties & Plotted Lands | Mt. Everest Real-Estate"
        description="Browse available plotted land parcels, residential colonies, commercial highway land, and scenic farm estates across Nepal with clear Lalpurja ownership."
        url={`${SITE_CONFIG.url}/projects`}
      />
      <Container size="xl">
        <div className="space-y-5 mb-8">
          <SectionTitle
            number="03"
            badge="PROPERTY CATALOG"
            title="Master-planned land schemes &"
            highlight="verified plot listings"
            description="Every land plot features cadastral boundary demarcation, minimum 20ft road connectivity, dedicated utility alignments, and immediate Lalpurja transferability."
            className="mb-0"
          />

          {/* Category Filter Tabs */}
          <div className="w-full max-w-full overflow-x-auto pb-1 scrollbar-none flex items-center">
            <Tabs
              tabs={categories}
              activeTab={activeCategory}
              onChange={setActiveCategory}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={setSelectedProject}
            />
          ))}
        </div>

        {/* Project Lightbox Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        {/* Visual Glimpses Showcase Carousel */}
        <div className="mt-14 pt-12 border-t border-[#E2E8F0] dark:border-[#1F2937]">
          <SectionTitle
            number="04"
            badge="SITE VISUALS"
            title="Real-world development &"
            highlight="aerial plot gallery"
            description="Drone photogrammetry, blacktop road networks, stone boundaries, and lush mountain panoramas from our projects."
          />
          <Gallery />
        </div>
      </Container>
    </div>
  )
}

export default ProjectsPage
