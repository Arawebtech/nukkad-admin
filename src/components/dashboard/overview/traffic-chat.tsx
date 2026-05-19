'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

interface Props {
  currentMonth: number;
  lastMonth: number;
  total: number;
}

export function TrafficChat({
  currentMonth,
  lastMonth,
  total,
}: Props) {
  return (
    <Paper
      sx={{
        p: 3,
        height: '100%',
        borderRadius: 3,
      }}
    >
      <Typography variant="h6" mb={2}>
        Traffic Overview
      </Typography>

      {/* Stack layout */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* Current Month */}
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Current Month
          </Typography>

          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary"
          >
            {currentMonth}
          </Typography>
        </Box>

        <Divider />

        {/* Last Month */}
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Last Month
          </Typography>

          <Typography
            variant="h5"
            fontWeight="bold"
            color="warning.main"
          >
            {lastMonth}
          </Typography>
        </Box>

        <Divider />

        {/* Total */}
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Total Traffic
          </Typography>

          <Typography
            variant="h4"
            fontWeight="bold"
            color="success.main"
          >
            {total}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}