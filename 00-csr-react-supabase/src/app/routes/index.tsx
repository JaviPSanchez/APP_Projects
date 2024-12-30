import { createBrowserRouter } from 'react-router-dom';

import { AppRoot } from './app/root';

export const createRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { LandingRoute } = await import('./landing');
        return { Component: LandingRoute };
      },
    },
    {
      path: '/auth/login',
      lazy: async () => {
        const { LoginRoute } = await import('./auth/login');
        return { Component: LoginRoute };
      },
    },

    {
      path: '/app',
      element: (
        // <ProtectedRoute>
        <AppRoot />
        // </ProtectedRoute>
      ),
      children: [
        {
          path: '',
          lazy: async () => {
            const { DashboardRoute } = await import('./app/dashboard');
            return { Component: DashboardRoute };
          },
        },
        {
          path: 'accounts',
          lazy: async () => {
            const { Accounts } = await import('./app/accounts');
            return { Component: Accounts };
          },
        },
        {
          path: 'bookings',
          lazy: async () => {
            const { Bookings } = await import('./app/bookings');
            return { Component: Bookings };
          },
        },
        {
          path: 'cabins',
          lazy: async () => {
            const { Cabins } = await import('./app/cabins');
            return { Component: Cabins };
          },
        },
        {
          path: 'users',
          lazy: async () => {
            const { NewUsers } = await import('./app/users');
            return { Component: NewUsers };
          },
        },
        {
          path: 'settings',
          lazy: async () => {
            const { Settings } = await import('./app/settings');
            return { Component: Settings };
          },
        },
      ],
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./not-found');
        return { Component: NotFoundRoute };
      },
    },
  ]);
