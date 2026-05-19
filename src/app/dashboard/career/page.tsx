'use client';

import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import CareersTable from '@/components/website/CareerSection';

export default function Page(): React.JSX.Element {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          
          {/* PAGE HEADING */}
          <Box>
            <Typography variant="h4" fontWeight={700}>
              Career Applications
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Manage all career applications,
              update status and review resumes.
            </Typography>
          </Box>

          {/* TABLE */}
          <CareersTable />
        </Stack>
      </Container>
    </Box>
  );
}