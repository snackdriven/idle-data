import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, fullWidth = false, className = "", id, ...props }, ref) => {
		const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

		return (
			<div
				className={`lj-input-wrapper ${fullWidth ? "full-width" : ""} ${className}`}
			>
				{label && (
					<label htmlFor={inputId} className="lj-input-label">
						{label}
					</label>
				)}
				<input
					ref={ref}
					id={inputId}
					className={`lj-input ${error ? "error" : ""}`}
					aria-invalid={error ? "true" : "false"}
					aria-describedby={error ? `${inputId}-error` : undefined}
					{...props}
				/>
				{error && (
					<span id={`${inputId}-error`} className="lj-input-error">
						{error}
					</span>
				)}
			</div>
		);
	},
);

Input.displayName = "Input";
