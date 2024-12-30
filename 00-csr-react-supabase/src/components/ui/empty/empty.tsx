import { ReactNode } from 'react';

// Define the props type for the Empty component
interface EmptyProps {
  resourceName: string;
  children?: ReactNode;
}

export const Empty: React.FC<EmptyProps> = ({ resourceName, children }) => {
  return (
    <div className="m-[2.4rem] text-center text-[1.4rem] font-medium">
      {children || `No ${resourceName} could be found.`}
    </div>
  );
};

export default Empty;
