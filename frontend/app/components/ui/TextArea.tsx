import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, fullWidth = false, className = '', id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={`lj-textarea-wrapper ${fullWidth ? 'full-width' : ''} ${className}`}>
        {label && (
          <label htmlFor={textareaId} className="lj-textarea-label">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`lj-textarea ${error ? 'error' : ''}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
        {error && (
          <span id={`${textareaId}-error`} className="lj-textarea-error">
            {error}
          </span>
        )}
      </div>
    );
  }
); 