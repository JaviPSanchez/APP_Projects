import React, { ReactNode } from 'react';

// Define the props type for the Empty component
interface EmptyProps {
  resource: string;
  children?: ReactNode;
}

export const Empty: React.FC<EmptyProps> = ({ resource, children }) => {
  return (
    <div className="m-[2.4rem] text-center text-[1.4rem] font-medium">
      {children || `No ${resource} could be found.`}
    </div>
  );
};

export default Empty;
