import { cn } from '@/utils/cn';

type TagProps = {
  type: 'blue' | 'green' | 'silver'; // Dynamic status-based colors
  children: React.ReactNode; // Ensure that children are valid React nodes
};

export const Tag: React.FC<TagProps> = ({ type, children }) => {
  // Define the color classes based on the `type` prop
  const colorClass = {
    blue: 'text-color-blue-700 bg-color-blue-100',
    green: 'text-color-green-700 bg-color-green-100',
    silver: 'text-color-silver-700 bg-color-silver-100',
  }[type];

  return (
    <span
      className={cn(
        'w-fit px-4 py-2 rounded-xl font-semibold text-center',
        colorClass,
      )}
    >
      {children}
    </span>
  );
};
