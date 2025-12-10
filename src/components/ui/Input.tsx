import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error = false, ...props }, ref) => {
    return (
      <input
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
      />
    );
  }
);

Input.displayName = 'Input';
