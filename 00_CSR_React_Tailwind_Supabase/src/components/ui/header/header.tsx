import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu';
import { User2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { cn } from '@/utils/cn';

import { Button } from '../button';
import { Drawer, DrawerContent } from '../drawer';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex border-b border-color-grey-100 bg-color-grey-0 p-2 px-10">
      <Drawer>
        <DrawerContent
          side="left"
          className="bg-black pt-10 text-white sm:max-w-60"
        ></DrawerContent>
      </Drawer>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="medium"
            className="overflow-hidden rounded-full"
          >
            <span className="sr-only">Open user menu</span>
            <User2 className="size-6 rounded-full" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => navigate('./profile')}
            className={cn('block px-4 py-2 text-sm text-gray-700')}
          >
            Your Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={cn('block px-4 py-2 text-sm text-gray-700 w-full')}
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
