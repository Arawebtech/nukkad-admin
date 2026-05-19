'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type Admin = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  userDp?: {
    url: string;
  };
};

export function AccountInfo({ admin }: { admin: Admin }): React.JSX.Element {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            {/* STATIC PLACEHOLDER IMAGE ONLY */}
            <Avatar
              src={admin?.userDp?.url || '/assets/avatar-3.png'}
              sx={{ height: '80px', width: '80px' }}
            />
          </div>

          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">
              {admin?.name || 'No Name'}
            </Typography>

            <Typography color="text.secondary" variant="body2">
              {admin?.address || 'No Address'}
            </Typography>

            <Typography color="text.secondary" variant="body2">
              {admin?.email || 'No Email'}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>

      <Divider />

      {/* ❌ BUTTON REMOVED AS REQUESTED */}
    </Card>
  );
}