import React, { ReactNode } from 'react';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  className?: string;
}

function Button(props: Props) {
  const { children, className = '', isLoading, ...rest } = props;

  return (
    <button
      type="button"
      className={`text-text-base px-10 py-3 rounded-sm ${className}`}
      {...rest}
    >
      {isLoading ? (
        <p className="text-white text-lg font-medium">
          <span className="mr-2">
            <i className="fa fa-spinner fa-spin" aria-hidden="true" />
          </span>
          Chargement...
        </p>
      ) : (
        children
      )}
    </button>
  );
}

export function PrimaryButton(props: Props) {
  const { children, className = '', isLoading, ...rest } = props;

  return (
    <Button
      className={` tracking-wide font-semibold bg-primary text-gray-100 w-full py-4 flex items-center justify-center ${className}`}
      {...rest}
    >
      {isLoading ? (
        <p className="text-white text-lg font-medium">
          <span className="mr-2">
            <i className="fa fa-spinner fa-spin" aria-hidden="true" />
          </span>
          Chargement...
        </p>
      ) : (
        children
      )}
    </Button>
  );
}

export function SecondaryButton(props: Props) {
  const { children, className = '', isLoading, ...rest } = props;

  return (
    <Button
      className={` tracking-wide font-semibold bg-secondary text-white w-full py-4 flex items-center justify-center ${className}`}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default Button;