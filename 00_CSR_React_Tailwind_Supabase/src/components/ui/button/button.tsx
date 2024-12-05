import { VariantProps, cva } from 'class-variance-authority';
import { type ClassValue, clsx } from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // Custom Props
  disabled?: boolean;
  isLoading?: boolean;
  type?: 'submit' | 'reset';
}

const buttonVariants = cva(
  'flex w-fit items-center justify-center rounded-md border border-color-grey-200 text-sm font-medium',
  {
    variants: {
      variant: {
        primary:
          'bg-color-brand-600 text-color-brand-50 hover:bg-color-brand-700',
        secondary: 'bg-color-grey-0 text-color-grey-600 hover:bg-color-grey-50',
        danger: 'bg-color-red-700 text-color-red-100  hover:bg-color-red-800',
      },
      size: {
        medium: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  },
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ disabled, className, variant, size, children, type, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ className, size, variant, ...props }))}
        type={type}
        {...props}
        disabled={disabled}
      >
        {children}
      </button>
    );
  },
);

export { Button, buttonVariants };
