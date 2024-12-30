import React from 'react';

interface FormRowProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

export const FormRow: React.FC<FormRowProps> = ({ label, error, children }) => {
  // Type guard to check if children is a valid React element
  const isValidElement = React.isValidElement(children);
  return (
    <div className="grid grid-cols-form-row items-center gap-2 border-b border-gray-100 px-0 py-4 last:border-b-0">
      {label && isValidElement && (
        <label className="w-full font-medium" htmlFor={children.props.id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-sm text-red-700">{error}</span>}
    </div>
  );
};
