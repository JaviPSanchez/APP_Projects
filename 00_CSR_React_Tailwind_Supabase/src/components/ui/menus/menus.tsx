import { EllipsisVertical } from 'lucide-react';
import { ReactNode, createContext, useContext, useState, FC } from 'react';

import { useOutsideClick } from '@/hooks/use-outside-click';

// Define the type for the MenusContext
interface MenusContextType {
  openId: string;
  close: () => void;
  open: (id: string) => void;
  position: { x: number; y: number } | null;
  setPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number } | null>
  >;
}

// 1) Create Context
const MenusContext = createContext<MenusContextType | undefined>(undefined);

// Define props type for Menus
interface MenusProps {
  children: ReactNode;
}

// Define additional component properties
interface MenusComponent extends FC<MenusProps> {
  Menu: FC<{ children: ReactNode; className?: string }>;
  Toggle: FC<{ id: string }>;
  List: FC<{ id: string; children: ReactNode }>;
  Button: FC<{
    children: ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
  }>;
}

// 2) Parent Component
export const Menus: MenusComponent = ({ children }) => {
  const [openId, setOpenId] = useState<string>('');
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );

  const close = () => setOpenId('');
  const open = (id: string) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

// 3) Child components

// Define props type for Menu
interface MenuProps {
  children: ReactNode;
}

const Menu: React.FC<MenuProps> = ({ children }) => {
  return (
    <div className="relative flex items-center justify-center">{children}</div>
  );
};

// Define props type for Toggle
interface ToggleProps {
  id: string;
}

const Toggle: React.FC<ToggleProps> = ({ id }) => {
  const context = useContext(MenusContext);

  if (!context) {
    throw new Error('Toggle must be used within a Menus component');
  }

  const { openId, close, open, setPosition } = context;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    // Element position
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.width,
      y: rect.height,
    });

    openId === '' || openId !== id ? open(id) : close();
  }

  return (
    <button
      className="translate-x-2 rounded-md border border-color-grey-100 bg-transparent p-1 transition-all duration-200 hover:bg-color-grey-100"
      onClick={handleClick}
    >
      <EllipsisVertical className="size-6 text-gray-700" />
    </button>
  );
};

// Define props type for List
interface ListProps {
  id: string;
  children: ReactNode;
}

const List: React.FC<ListProps> = ({ id, children }) => {
  const context = useContext(MenusContext);

  if (!context) {
    throw new Error('List must be used within a Menus component');
  }

  const { openId, position, close } = context;
  const ref = useOutsideClick<HTMLUListElement>(close);

  if (openId !== id || !position) return null;

  return (
    <ul
      className="absolute right-14 z-50 w-fit rounded-md border border-color-grey-200 bg-color-grey-0 shadow-md"
      ref={ref}
    >
      {children}
    </ul>
  );
};

// Define props type for Button
interface ButtonProps {
  children: ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, icon, onClick }) => {
  const context = useContext(MenusContext);

  // Check if context is undefined
  if (!context) {
    throw new Error('Button must be used within a Menus component');
  }

  const { close } = context;

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        className="flex w-full items-center gap-4 border-none bg-transparent p-3 text-left text-lg transition-all hover:bg-color-grey-50"
        onClick={handleClick}
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
};

// 4) Properties
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
