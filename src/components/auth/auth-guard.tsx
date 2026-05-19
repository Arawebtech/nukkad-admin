'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import {
  useSelector,
} from 'react-redux';

import type {
  RootState,
} from '@/redux/store';



export interface AuthGuardProps {
  children: React.ReactNode;
}



export function AuthGuard({
  children,
}: AuthGuardProps): React.JSX.Element | null {
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
    // not login
    if (!isLoggedIn) {
      router.replace(
        '/auth/sign-in'
      );
    }
  }, [
    isLoggedIn,
    router,
  ]);



  // not login
  if (!isLoggedIn) {
    return null;
  }



  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}