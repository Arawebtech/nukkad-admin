'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { Logo } from '@/components/core/logo';

import { navItems } from './config';
import { navIcons } from './nav-icons';

/* =========================================
   SIDENAV
========================================= */

function SideNavComponent(): React.JSX.Element {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        '--SideNav-background': '#0f172a',
        '--SideNav-color': '#ffffff',

        '--NavItem-color': '#cbd5e1',
        '--NavItem-hover-background': 'rgba(255,255,255,0.06)',

        '--NavItem-active-background': '#15b79e',
        '--NavItem-active-color': '#ffffff',

        '--NavItem-icon-color': '#94a3b8',
        '--NavItem-icon-active-color': '#ffffff',

        bgcolor: 'var(--SideNav-background)',
        color: 'var(--SideNav-color)',

        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',

        position: 'fixed',
        top: 0,
        left: 0,

        width: '280px',
        height: '100vh',

        borderRight: '1px solid rgba(255,255,255,0.08)',

        overflowY: 'auto',
        scrollbarWidth: 'none',

        zIndex: 1200,

        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {/* LOGO */}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        // sx={{
        //   px: 3,
        //   py: 2,
        // }}
      >
        <Box
          component={RouterLink}
          href={paths.home}
            // href={href}
  prefetch={true}

          // prefetch
          sx={{
            display: 'inline-flex',
            textDecoration: 'none',
          }}
        >
          <Logo color="light" height={100} width={280} />
        </Box>
      </Stack>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      {/* NAVIGATION */}

      <Box
        component="nav"
        sx={{
          flex: '1 1 auto',
          px: 2,
          py: 2,
        }}
      >
        {renderNavItems({
          pathname,
          items: navItems,
        })}
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      {/* FOOTER */}

      <Box
        sx={{
          p: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: '#94a3b8',
            textAlign: 'center',
          }}
        >
          Nukkad Natak Admin Panel
        </Typography>
      </Box>
    </Box>
  );
}

/* =========================================
   RENDER NAV ITEMS
========================================= */

function renderNavItems({
  items = [],
  pathname,
}: {
  items?: NavItemConfig[];
  pathname: string;
}): React.JSX.Element {
  return (
    <Stack
      component="ul"
      spacing={1}
      sx={{
        listStyle: 'none',
        m: 0,
        p: 0,
      }}
    >
      {items.map((item) => {
        const { key, ...rest } = item;

        return (
          <NavItem
            key={key}
            pathname={pathname}
            {...rest}
          />
        );
      })}
    </Stack>
  );
}

/* =========================================
   NAV ITEM
========================================= */

interface NavItemProps
  extends Omit<NavItemConfig, 'items'> {
  pathname: string;
}

function NavItem({
  disabled,
  external,
  href,
  icon,
  matcher,
  pathname,
  title,
}: NavItemProps): React.JSX.Element {
  const active = isNavItemActive({
    disabled,
    external,
    href,
    matcher,
    pathname,
  });

  const Icon = icon ? navIcons[icon] : null;

  return (
    <li>
      <Box
        {...(href
          ? {
              component: external
                ? 'a'
                : RouterLink,

              href,

              prefetch: true,

              target: external
                ? '_blank'
                : undefined,

              rel: external
                ? 'noreferrer'
                : undefined,
            }
          : {
              role: 'button',
            })}
        sx={{
          alignItems: 'center',

          borderRadius: '12px',

          color: active
            ? 'var(--NavItem-active-color)'
            : 'var(--NavItem-color)',

          cursor: disabled
            ? 'not-allowed'
            : 'pointer',

          display: 'flex',

          gap: 1.5,

          px: 2,
          py: 1.3,

          textDecoration: 'none',

          transition: 'all 0.2s ease',

          bgcolor: active
            ? 'var(--NavItem-active-background)'
            : 'transparent',

          '&:hover': {
            bgcolor: active
              ? 'var(--NavItem-active-background)'
              : 'var(--NavItem-hover-background)',
          },

          opacity: disabled ? 0.5 : 1,
        }}
      >
        {/* ICON */}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            minWidth: '24px',
          }}
        >
          {Icon ? (
            <Icon
              fontSize="var(--icon-fontSize-md)"
              weight={active ? 'fill' : 'regular'}
              fill={
                active
                  ? 'var(--NavItem-icon-active-color)'
                  : 'var(--NavItem-icon-color)'
              }
            />
          ) : null}
        </Box>

        {/* TITLE */}

        <Box sx={{ flex: '1 1 auto' }}>
          <Typography
            component="span"
            sx={{
              color: 'inherit',
              fontSize: '0.92rem',
              fontWeight: 600,
              lineHeight: '24px',
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </li>
  );
}

/* =========================================
   EXPORT WITH MEMO
========================================= */

export const SideNav = React.memo(
  SideNavComponent
);