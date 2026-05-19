// app/dashboard/page.tsx

import type { Metadata } from 'next';

import { config } from '@/config';
import DashboardView from './dashboard-view';

export const metadata: Metadata = {
  title: `Overview | Dashboard | ${config.site.name}`,
};

export default function Page() {
  return <DashboardView />;
}