// External Libraries
import { X } from 'lucide-react';
import React, {
  createContext,
  createElement,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

// Hooks
import { useOutsideClick } from '@/hooks/use-outside-click';

// 1) Create context
interface ModalContextType {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// 2) Parent component
interface ModalProps {
  children: ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
  const [openName, setOpenName] = useState<string>('');

  const close = () => setOpenName('');
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

// 3) Child Components
interface OpenProps {
  children: ReactNode;
  opens: string;
}

function Open({ children, opens: opensWindowName }: OpenProps) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('Open must be used within a Modal');
  }

  const { open } = context;

  if (!children || !React.isValidElement(children)) {
    return null;
  }

  return createElement((children as React.ReactElement).type, {
    ...children.props,
    onClick: () => open(opensWindowName),
  });
}

interface WindowProps {
  children: ReactNode;
  name: string;
}

function Window({ children, name }: WindowProps) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('Window must be used within a Modal');
  }

  const { openName, close } = context;
  const ref = useOutsideClick<HTMLDivElement>(close);

  if (name !== openName) return null;

  // Ensure children is not null or undefined
  if (!children || !React.isValidElement(children)) {
    return null;
  }

  return createPortal(
    <div className="fixed left-0 top-0 z-50 h-screen w-full backdrop-blur-sm transition-all duration-500">
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-color-grey-0 px-2 py-4 drop-shadow-xl transition-all duration-500"
        ref={ref}
      >
        <button
          className="absolute -right-4 -top-4 rounded-full border transition-all"
          onClick={close}
        >
          <X className="size-12 rounded-full bg-color-grey-0 p-2 hover:bg-color-red-100" />
        </button>

        <div>
          {createElement((children as React.ReactElement).type, {
            ...children.props,
            onCloseModal: close,
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
}

// 4) Properties
Modal.Open = Open;
Modal.Window = Window;
