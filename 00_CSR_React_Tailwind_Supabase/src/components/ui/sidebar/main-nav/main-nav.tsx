import { Home, Users, CalendarDays, Settings, School } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { SideNavigationItem } from '@/components/layouts/types';
import { cn } from '@/utils/cn';

export const MainNav = () => {
  const navigation: SideNavigationItem[] = [
    { name: 'Home', to: '.', icon: Home },
    { name: 'Bookings', to: './bookings', icon: CalendarDays },
    { name: 'Cabins', to: './cabins', icon: School },
    { name: 'Users', to: './users', icon: Users },
    { name: 'Settings', to: './settings', icon: Settings },
    // checkAccess() ? { name: 'Users', to: './users', icon: Users } : undefined,
  ].filter(Boolean) as SideNavigationItem[];
  return (
    <nav className="flex flex-col items-center gap-4 px-2 py-4">
      {navigation.map(item => (
        <NavLink
          key={item.name}
          to={item.to}
          end={item.name !== 'Dash'}
          className={({ isActive }) =>
            cn(
              'flex flex-row text-color-grey-600 hover:bg-color-grey-100 hover:text-color-brand-600 group w-full items-center p-2 text-base font-medium rounded-lg',
              isActive && 'bg-color-grey-100 text-color-brand-600',
            )
          }
        >
          {({ isActive }) => (
            <>
              <item.icon
                className={cn(
                  'w-6 h-6 mr-4 text-color-grey-400 transition duration-300',
                  isActive
                    ? 'text-color-brand-600'
                    : 'group-hover:text-color-brand-600',
                )}
                aria-hidden="true"
              />
              {item.name}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
