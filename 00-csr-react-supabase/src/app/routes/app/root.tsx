import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';

import { DashboardLayout } from '@/components/layouts';

export const AppRoot = () => {
  const location = useLocation();
  return (
    <DashboardLayout>
      <ErrorBoundary
        key={location.pathname}
        fallback={<div>Something went wrong!</div>}
      >
        <Outlet />
      </ErrorBoundary>
    </DashboardLayout>
  );
};
