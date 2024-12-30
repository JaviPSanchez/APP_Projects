import { type ClassValue, clsx } from 'clsx';
import { FC, InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

// Utility function to merge class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Interface for FileInput props
interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  // Add any custom props if needed
}

// FileInput component with forwardRef
const FileInput: FC<FileInputProps> = forwardRef<
  HTMLInputElement,
  FileInputProps
>(({ className, ...props }, ref) => {
  return (
    <input
      type="file"
      ref={ref}
      className={cn(
        'file:mr-3 file:cursor-pointer file:rounded-sm file:border-none file:bg-color-brand-600 file:px-4 file:py-2 file:font-medium file:text-color-brand-50 file:transition-colors file:hover:bg-color-brand-700',
        className,
      )}
      {...props}
    />
  );
});

export { FileInput };
