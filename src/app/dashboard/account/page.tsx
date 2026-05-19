'use client';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

import AccountDetailsForm from '@/components/dashboard/account/account-details-form';
import { AccountInfo } from '@/components/dashboard/account/account-info';

export default function Page(): React.JSX.Element {

  const admin = useSelector((state: any) => state.auth.admin);

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Account</Typography>
      </div>

      {/* ================= GRID CONTAINER ================= */}
      <Grid container spacing={3}>

        {/* ================= ACCOUNT INFO ================= */}
        <Grid size={{ xs: 12, md: 6 }}>
          <AccountInfo admin={admin} />
        </Grid>

        {/* ================= ACCOUNT FORM ================= */}
        <Grid size={{ xs: 12, md: 6 }}>
          <AccountDetailsForm admin={admin} />
        </Grid>

      </Grid>
    </Stack>
  );
}