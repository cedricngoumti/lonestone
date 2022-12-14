import { InputHTMLAttributes } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  type: 'email' | 'password' | 'text';
  rules?: RegisterOptions;
  errorMessage?: string;
  containerStyle?: string;
}

export default function TextField({
  label,
  name,
  placeholder,
  type,
  className,
  errorMessage,
  containerStyle,
  rules = {},
  ...props
}: TextFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={containerStyle}>
      {label && (
        <label className="text-gray-500" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        type={type}
        {...register(name, rules)}
        placeholder={placeholder}
        className={`  block w-full px-4 py-2 my-1  text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:outline-none focus:bg-white focus:ring-2 focus:border-0 focus:ring-primary/40 ${className} ${
          errors[name] ? 'border-danger' : 'border-gray-300'
        }`}
        {...props}
      />
      {errors[name] && <ErrorMessage name={name} />}
    </div>
  );
}
