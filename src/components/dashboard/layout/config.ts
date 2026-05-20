import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  {
    key: 'overview',
    title: 'Overview',
    href: paths.dashboard.overview,
    icon: 'chart-pie',
  },
  // {
  //   key: 'customers',
  //   title: 'Customers',
  //   href: paths.dashboard.users,
  //   icon: 'users',
  // },
  {
    key: 'services',
    title: 'Services',
    href: paths.dashboard.services,
    icon: 'puzzle-piece',
  },
  {
    key: 'enquiries',
    title: 'Enquiries',
    href: paths.dashboard.enquiries,
    icon: 'chat-circle-dots',
  },
  {
    key: 'career',
    title: 'Career',
    href: paths.dashboard.career,
    icon: 'briefcase',
  },

    {
    key: 'blog',
    title: 'Blog',
    href: paths.dashboard.blog,
    icon: 'briefcase',
  },
  {
  key: 'category',
  title: 'Category',
  href: paths.dashboard.category,
  icon: 'category',
},
  {
  key: 'gallery',
  title: 'Gallery',
  href: paths.dashboard.gallery,
  icon: 'gallery',
},
  // {
  //   key: 'settings',
  //   title: 'Settings',
  //   href: paths.dashboard.settings,
  //   icon: 'gear-six',
  // },
  {
    key: 'account',
    title: 'Account',
    href: paths.dashboard.account,
    icon: 'user',
  },
  // {
  //   key: 'error',
  //   title: 'Error',
  //   href: paths.errors.notFound,
  //   icon: 'x-square',
  // },
] satisfies NavItemConfig[];