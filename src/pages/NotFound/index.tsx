import { Link } from 'react-router-dom'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { Seo } from '@/components/Seo'
import { ArrowLeft } from '@/assets/icons'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full flex-1 flex items-center justify-center py-24 sm:py-32 bg-grid-pattern dark:bg-[#090D16]">
      <Seo title="404 - Property Not Found | Mt. Everest Real-Estate" description="The requested real estate parcel or route could not be resolved." />
      <Container size="md" className="text-center">
        <span className="font-mono text-xs font-bold text-[#166534] dark:text-[#4ADE80] tracking-widest uppercase">
          ERROR 404 · UNRESOLVED PROPERTY ROUTE
        </span>
        <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold font-heading text-[#111827] dark:text-[#F9FAFB]">
          Page Not Located
        </h1>
        <p className="mt-3 text-base text-[#6B7280] dark:text-[#9CA3AF] max-w-md mx-auto leading-relaxed">
          The requested property listing or page does not exist or has been relocated to another section.
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/">
            <Button variant="primary" leftIcon={<ArrowLeft className="size-4" />}>
              Return to Mt. Everest Real-Estate Homepage
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  )
}

export default NotFoundPage
