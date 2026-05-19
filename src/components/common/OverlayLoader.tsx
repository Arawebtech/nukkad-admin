'use client';

import * as React from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type LoaderProps = {
  open: boolean;
};

export default function OverlayLoader({
  open,
}: LoaderProps) {
  return (
    <Backdrop
      open={open}
      sx={{
        color: '#fff',
        zIndex: (theme) =>
          theme.zIndex.modal + 999,
        backdropFilter: 'blur(4px)',
        background:
          'rgba(0,0,0,0.45)',
      }}
    >
      <CircularProgress
        color="inherit"
      />
    </Backdrop>
  );
}