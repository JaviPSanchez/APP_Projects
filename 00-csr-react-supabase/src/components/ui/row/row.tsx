import { ReactNode, HTMLProps } from 'react';

interface RowProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  type?: 'horizontal' | 'vertical';
}

export const Row: React.FC<RowProps> = ({
  children,
  type = 'vertical',
  ...rest
}) => {
  if (type === 'horizontal')
    return (
      <div className="mx-4 my-6 flex items-center justify-between" {...rest}>
        {children}
      </div>
    );

  return (
    <div className="mx-4 my-8 flex flex-col gap-6" {...rest}>
      {children}
    </div>
  );
};
