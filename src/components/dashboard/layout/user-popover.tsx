'use client';

import * as React from 'react';

import RouterLink from 'next/link';

import { useRouter } from 'next/navigation';

import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import { GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';
import { UserIcon } from '@phosphor-icons/react/dist/ssr/User';

import { paths } from '@/paths';

import { logout } from '@/redux/features/authSlice';

export interface UserPopoverProps {
  anchorEl: Element | null;

  onClose: () => void;

  open: boolean;
}

export function UserPopover({
  anchorEl,
  onClose,
  open,
}: UserPopoverProps): React.JSX.Element {
  const router = useRouter();

  const dispatch =
    useDispatch();

  /* ==============================
     REDUX USER
  ============================== */

  const {
    admin,
    isLoggedIn,
  } = useSelector(
    (state: any) =>
      state.auth
  );

  /* ==============================
     LOGOUT
  ============================== */

  const handleSignOut =
    React.useCallback(
      async (): Promise<void> => {
        try {
          dispatch(logout());

          router.push('/auth/sing-in');

          onClose();
        } catch (error) {
          console.log(error);
        }
      },
      [
        dispatch,
        router,
        onClose,
      ]
    );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      slotProps={{
        paper: {
          sx: {
            width: '240px',
          },
        },
      }}
    >
      {/* USER INFO */}
      <Box
        sx={{
          p: '16px 20px',
        }}
      >
        <Typography variant="subtitle1">
          {admin?.name ||
            'Admin'}
        </Typography>

        <Typography
          color="text.secondary"
          variant="body2"
        >
          {admin?.email ||
            'admin@gmail.com'}
        </Typography>
      </Box>

      <Divider />

      {/* MENU */}
      <MenuList
        disablePadding
        sx={{
          p: '8px',

          '& .MuiMenuItem-root':
            {
              borderRadius: 1,
            },
        }}
      >
        {/* SETTINGS */}
        <MenuItem
          component={
            RouterLink
          }
          href={
            paths.dashboard
              .settings
          }
          onClick={onClose}
        >
          <ListItemIcon>
            <GearSixIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>

          Settings
        </MenuItem>

        {/* PROFILE */}
        <MenuItem
          component={
            RouterLink
          }
          href={
            paths.dashboard
              .account
          }
          onClick={onClose}
        >
          <ListItemIcon>
            <UserIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>

          Profile
        </MenuItem>

        {/* LOGOUT */}
        <MenuItem
          onClick={
            handleSignOut
          }
        >
          <ListItemIcon>
            <SignOutIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>

          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
}