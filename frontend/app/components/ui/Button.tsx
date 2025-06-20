import { memo } from 'react';
import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

function ButtonComponent({
  children,
  variant = 'primary',
  isLoading = false,
  size = 'md',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`lj-button lj-button-${variant} lj-button-${size} ${
        isLoading ? 'loading' : ''
      } ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <span className="lj-button-loader" aria-hidden="true">
          ●
        </span>
      ) : null}
      <span className={isLoading ? 'lj-button-text-loading' : ''}>
        {children}
      </span>
    </button>
  );
}

export const Button = memo(ButtonComponent); 