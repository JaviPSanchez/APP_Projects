import { type ClassValue, clsx } from 'clsx';
import { FC, InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // You can add custom props here if needed
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ className, disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          `rounded-md border px-4 py-2 shadow-sm ${disabled ? 'bg-color-grey-400' : 'bg-gray-50'}`,
          className,
        )}
        {...props}
      />
    );
  },
);

export { Input };
