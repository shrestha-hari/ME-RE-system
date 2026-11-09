import type { NavItem, SocialLink } from '@/types'
import { getAssetUrl } from './routing'

export const SITE_CONFIG = {
  name: 'Mt. Everest Real-Estate',
  shortName: 'Mt. Everest Real-Estate',
  title: 'Mt. Everest Real-Estate | Premier Land Plotting & Properties in Nepal',
  description:
    'Premier land development, verified land plotting, residential colonies, and property investment advisory across Kathmandu Valley and Nepal with 100% clear Lalpurja ownership.',
  author: 'Mt. Everest Real-Estate',
  url: 'https://mteverestrealestate.com.np',
  email: 'info@mteverestrealestate.com.np',
  phone: '(+977) 01-4498221 / 9851082210',
  resumeUrl: getAssetUrl('brochure.pdf'),
  avatar: getAssetUrl('images/background.webp'),
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/projects' },
  { label: 'Services', href: '/skills' },
  { label: 'About', href: '/about' },
  { label: 'Land Calculator', href: '/utilities' },
  { label: 'Reviews', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'facebook',
    label: 'Facebook',
    url: 'https://facebook.com/mteverestrealestate',
  },
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/company/mteverestrealestate',
  },
  {
    platform: 'twitter',
    label: 'Twitter / X',
    url: 'https://x.com/everest_realty',
  },
  {
    platform: 'whatsapp',
    label: 'WhatsApp',
    url: 'https://wa.me/9779851082210',
  },
  {
    platform: 'email',
    label: 'Email',
    url: 'mailto:info@mteverestrealestate.com.np',
  },
  {
    platform: 'phone',
    label: 'Call Office',
    url: 'tel:+977014498221',
  },
]
