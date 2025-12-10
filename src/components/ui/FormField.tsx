import { ReactNode } from 'react';
import { bayerSansClasses } from '../../lib/bayer-sans';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}

export const FormField = ({
  label,
  htmlFor,
  error,
  hint,
  required = false,
  children,
}: FormFieldProps) => {
  return (
    <div className="mb-4">
      <label 
        htmlFor={htmlFor} 
        className={`block mb-2 ${bayerSansClasses.body.base} font-medium text-gray-700`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className={`mt-1 text-sm text-gray-500 ${bayerSansClasses.caption}`}>{hint}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
