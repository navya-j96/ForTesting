import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error = false, ...props }, ref) => {
    return (
      <textarea
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

Textarea.displayName = 'Textarea';
