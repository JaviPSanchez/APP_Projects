import { type ClassValue, clsx } from 'clsx';
import { FC, TextareaHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  // Add any custom props if needed
}

const Textarea: FC<TextareaProps> = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'h-40 w-full resize-none border border-gray-300 px-4 py-2 shadow-sm',
        className,
      )}
      {...props}
    />
  );
});

export { Textarea };
