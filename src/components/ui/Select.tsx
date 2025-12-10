import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string }>;
  error?: boolean;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', options, error = false, placeholder, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`
          block w-full px-3 py-2 
          border ${error ? 'border-red-500' : 'border-gray-300'} 
          rounded-md shadow-sm 
          focus:outline-none 
          focus:ring-blue-500 
          focus:border-blue-500 
          sm:text-sm
          ${className}
        `}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = 'Select';
