export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    // users: '/dashboard/customers',
    services: '/dashboard/services',
    enquiries: '/dashboard/enquiries',
    career: '/dashboard/career',
    category: '/dashboard/category',
    gallery: '/dashboard/gallery',
    blog: '/dashboard/blog',

    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
