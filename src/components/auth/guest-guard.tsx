'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import {
  useSelector,
} from 'react-redux';

import type {
  RootState,
} from '@/redux/store';



export interface GuestGuardProps {
  children: React.ReactNode;
}



export function GuestGuard({
  children,
}: GuestGuardProps): React.JSX.Element | null {
  const router =
    useRouter();



  const {
    isLoggedIn,
  } = useSelector(
    (
      state: RootState
    ) => state.auth
  );



  React.useEffect(() => {
    // already login
    if (isLoggedIn) {
      router.replace(
        '/dashboard'
      );
    }
  }, [
    isLoggedIn,
    router,
  ]);



  // logged user
  if (isLoggedIn) {
    return null;
  }



  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}