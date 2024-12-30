import { useEffect, useRef, MutableRefObject } from 'react';

type Handler = () => void;

export function useOutsideClick<T extends HTMLElement>(
  handler: Handler,
  listenCapturing: boolean = true,
): MutableRefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        e.stopPropagation();
        handler();
      }
    }

    document.addEventListener('click', handleClick, listenCapturing);

    return () => {
      document.removeEventListener('click', handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref;
}
