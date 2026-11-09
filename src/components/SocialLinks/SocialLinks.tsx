import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  LinktreeIcon,
  YoutubeIcon,
  TiktokIcon,
  InstagramIcon,
  FacebookIcon,
  MailIcon,
  GlobeIcon,
  PhoneIcon,
} from '@/assets/icons'
import { SOCIAL_LINKS } from '@/utils'
import { cn } from '@/utils'
import type { SocialLink } from '@/types'

export interface SocialLinksProps {
  links?: SocialLink[]
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const renderIcon = (platform: string, iconSizeClass: string) => {
  switch (platform.toLowerCase()) {
    case 'youtube':
      return <YoutubeIcon className={iconSizeClass} />
    case 'tiktok':
      return <TiktokIcon className={iconSizeClass} />
    case 'instagram':
      return <InstagramIcon className={iconSizeClass} />
    case 'facebook':
      return <FacebookIcon className={iconSizeClass} />
    case 'whatsapp':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconSizeClass}>
          <path d="M12.031 0C5.399 0 .016 5.383.016 12.015c0 2.115.553 4.18 1.603 5.998L0 24l6.168-1.618a11.96 11.96 0 0 0 5.863 1.523h.005c6.632 0 12.016-5.384 12.016-12.015 0-3.208-1.25-6.222-3.52-8.492C18.261 1.25 15.244 0 12.031 0zm-.005 21.897a9.92 9.92 0 0 1-5.06-1.385l-.363-.215-3.76.986 1.003-3.664-.237-.377a9.92 9.92 0 0 1-1.526-5.226c0-5.485 4.463-9.948 9.953-9.948 2.658 0 5.156 1.035 7.034 2.913a9.88 9.88 0 0 1 2.913 7.034c0 5.485-4.463 9.948-9.954 9.948zm5.45-7.447c-.298-.149-1.764-.87-2.037-.97-.273-.1-.471-.149-.67.149-.199.298-.77 97-.944 1.168-.174.198-.348.223-.646.075-.298-.149-1.259-.464-2.398-1.48a8.88 8.88 0 0 1-1.658-2.057c-.174-.298-.019-.459.13-.608.134-.134.298-.348.447-.522.149-.174.199-.298.298-.497.1-.199.05-.373-.025-.522-.075-.149-.67-1.616-.918-2.213-.242-.581-.487-.502-.67-.512l-.571-.01c-.198 0-.522.075-.795.373s-1.043 1.019-1.043 2.485 1.068 2.883 1.217 3.082c.149.199 2.102 3.21 5.093 4.502.712.308 1.268.492 1.701.63.715.228 1.365.196 1.88.119.574-.086 1.764-.721 2.012-1.417.248-.696.248-1.293.174-1.417-.075-.124-.273-.199-.571-.348z"/>
        </svg>
      )
    case 'phone':
    case 'call':
      return <PhoneIcon className={iconSizeClass} />
    case 'linkedin':
      return <LinkedinIcon className={iconSizeClass} />
    case 'twitter':
    case 'x':
      return <TwitterIcon className={iconSizeClass} />
    case 'linktree':
      return <LinktreeIcon className={iconSizeClass} />
    case 'email':
    case 'mail':
      return <MailIcon className={iconSizeClass} />
    case 'github':
      return <GithubIcon className={iconSizeClass} />
    default:
      return <GlobeIcon className={iconSizeClass} />
  }
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  links = SOCIAL_LINKS,
  orientation = 'horizontal',
  size = 'md',
  className = '',
}) => {
  const iconSizeClasses = {
    sm: 'size-4',
    md: 'size-4.5',
    lg: 'size-5',
  }

  const buttonSizeClasses = {
    sm: 'w-8 h-8 rounded-[6px]',
    md: 'w-9 h-9 rounded-[8px]',
    lg: 'w-10 h-10 rounded-[8px]',
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        className
      )}
    >
      {links.map((link) => (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.label}
          className={cn(
            'inline-flex items-center justify-center border border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#111827] text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#166534] dark:hover:text-[#4ADE80] hover:border-[#166534] dark:hover:border-[#22C55E] hover:bg-[#F5F7F6] dark:hover:bg-[#1E293B] transition-all duration-150 shadow-2xs hover:-translate-y-0.5',
            buttonSizeClasses[size]
          )}
        >
          {link.icon || renderIcon(link.platform, iconSizeClasses[size])}
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
