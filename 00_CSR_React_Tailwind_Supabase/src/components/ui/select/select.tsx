import React from 'react';

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  type?: 'white' | 'default';
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  type = 'default',
  ...props
}) => {
  return (
    <select
      className={`rounded-md px-3 py-2 text-lg font-medium shadow-sm ${
        type === 'white' ? 'border-gray-100' : 'border-gray-300'
      } bg-gray-50`}
      value={value}
      onChange={onChange}
      {...props}
    >
      {options.map(option => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
