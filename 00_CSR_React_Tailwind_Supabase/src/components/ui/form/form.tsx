import { cn } from '@/utils/cn';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  type?: 'regular' | 'modal';
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({
  type = 'regular',
  onSubmit,
  children,
  ...props
}) => {
  const formClass = cn('overflow-hidden text-sm', {
    'rounded-md': type === 'regular',
    'w-60 md:w-fit px-10': type === 'modal',
  });

  return (
    <form className={formClass} onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
};
