'use client';

import * as React from 'react';

import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { Budget } from '@/components/dashboard/overview/budget';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { Traffic } from '@/components/dashboard/overview/traffic';
import { TrafficChat } from '@/components/dashboard/overview/traffic-chat';

interface DashboardItem {
  total: number;
  currentMonth: number;
  lastMonth: number;
  difference: number;
  trend: string;
  percentage: number;
}

interface DashboardData {
  services: DashboardItem;
  enquiry: DashboardItem;
  career: DashboardItem;
  gallery: DashboardItem;
}

interface TrafficData {
  totalTraffic: number;
  currentMonthTraffic: number;
  lastMonthTraffic: number;
  difference: number;
  trend: string;
  percentage: number;
}

export default function DashboardView() {
  const [loading, setLoading] =
    React.useState(true);

  const [dashboardData, setDashboardData] =
    React.useState<DashboardData | null>(
      null
    );

  const [trafficData, setTrafficData] =
    React.useState<TrafficData | null>(
      null
    );

  const fetchDashboardData =
    async () => {
      try {
        const [dashboardRes, trafficRes] =
          await Promise.all([
            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`
            ),

            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/traffic/stats`
            ),
          ]);

        const dashboardJson =
          await dashboardRes.json();

        const trafficJson =
          await trafficRes.json();

        console.log(
          'Dashboard:',
          dashboardJson
        );

        console.log(
          'Traffic:',
          trafficJson
        );

        if (dashboardJson.success) {
          setDashboardData(
            dashboardJson.data
          );
        }

        if (trafficJson.success) {
          setTrafficData(
            trafficJson.data
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  React.useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {/* SERVICES */}
      <Grid
        size={{ lg: 3, sm: 6, xs: 12 }}
      >
        <Budget
        title='Services'
          diff={
            dashboardData?.services
              ?.percentage || 0
          }
          trend={
            dashboardData?.services
              ?.trend === 'increase'
              ? 'up'
              : 'down'
          }
          sx={{ height: '100%' }}
        value={String(dashboardData?.services?.total || 0)}
        />
      </Grid>

      {/* ENQUIRY */}
      <Grid
        size={{ lg: 3, sm: 6, xs: 12 }}
      >
        <TasksProgress
          sx={{ height: '100%' }}
          value={
            dashboardData?.enquiry
              ?.total || 0
          }
        />
      </Grid>

      {/* CAREER */}
      <Grid
        size={{ lg: 3, sm: 6, xs: 12 }}
      >
        <Budget
title='Applications'
          diff={
            dashboardData?.career
              ?.percentage || 0
          }
          trend={
            dashboardData?.career
              ?.trend === 'increase'
              ? 'up'
              : 'down'
          }
          sx={{ height: '100%' }}
        value={String(dashboardData?.career?.total || 0)}
        />
      </Grid>

      {/* GALLERY */}
      <Grid
        size={{ lg: 3, sm: 6, xs: 12 }}
      >
        <TotalCustomers
          diff={
            dashboardData?.gallery
              ?.percentage || 0
          }
          trend={
            dashboardData?.gallery
              ?.trend === 'increase'
              ? 'up'
              : 'down'
          }
          sx={{ height: '100%' }}
      value={String(dashboardData?.gallery?.total || 0)}
        />
      </Grid>

      {/* TRAFFIC CHART */}

<Grid size={{ lg: 6, xs: 12 }}>
  <TrafficChat
    currentMonth={
      trafficData?.currentMonthTraffic || 0
    }
    lastMonth={
      trafficData?.lastMonthTraffic || 0
    }
    total={trafficData?.totalTraffic || 0}
  />
</Grid>

      <Grid
        size={{ lg: 6, xs: 12 }}
      >
        <Traffic
          chartSeries={[
            Number(
              trafficData?.currentMonthTraffic ||
                0
            ),

            Number(
              trafficData?.lastMonthTraffic ||
                0
            ),

            Number(
              trafficData?.totalTraffic ||
                0
            ),
          ]}
          labels={[
            'Current Month',
            'Last Month',
            'Total Traffic',
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
    </Grid>
  );
}