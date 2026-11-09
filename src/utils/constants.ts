import type { NavItem, SocialLink } from '@/types'
import { getAssetUrl } from './routing'

export const SITE_CONFIG = {
  name: 'Mt. Everest Real-Estate',
  shortName: 'Mt. Everest Real-Estate',
  title: 'Mt. Everest Real-Estate | Land Plotting & Properties in Nepal',
  description:
    'Reliable land plotting, residential plots, and agricultural land in Lalitpur (Lubhu, Lamatar), Bara (Kolhabi), and Chitwan (Madi, Meghauli), with corporate office at Samakhushi 26, Kathmandu and verified Lalpurja ownership.',
  author: 'Hari Bahadur Shrestha',
  url: 'https://shrestha-hari.github.io/ME-RE-system',
  email: 'shresthah987@gmail.com',
  secondaryEmail: 'haribahadurshrestha566@gmail.com',
  phone: '9851068067 / 9861080943',
  location: 'Samakhushi 26, Kathmandu, Nepal',
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
    platform: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/@HariShrestha4',
  },
  {
    platform: 'facebook',
    label: 'Facebook',
    url: 'https://www.facebook.com/hari.shrestha.65666',
  },
  {
    platform: 'tiktok',
    label: 'TikTok',
    url: 'https://www.tiktok.com/@shrestha_h111',
  },
  {
    platform: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/shrestha366/',
  },
  {
    platform: 'github',
    label: 'GitHub',
    url: 'https://github.com/shrestha-hari',
  },
  {
    platform: 'whatsapp',
    label: 'WhatsApp',
    url: 'https://wa.me/9779851068067',
  },
  {
    platform: 'email',
    label: 'Email',
    url: 'mailto:shresthah987@gmail.com',
  },
  {
    platform: 'phone',
    label: 'Call Us',
    url: 'tel:+9779851068067',
  },
]
