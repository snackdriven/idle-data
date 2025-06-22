import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectOption {
	value: string;
	label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	error?: string;
	options: SelectOption[];
	fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	(
		{ label, error, options, fullWidth = false, className = "", id, ...props },
		ref,
	) => {
		const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

		return (
			<div
				className={`lj-select-wrapper ${fullWidth ? "full-width" : ""} ${className}`}
			>
				{label && (
					<label htmlFor={selectId} className="lj-select-label">
						{label}
					</label>
				)}
				<select
					ref={ref}
					id={selectId}
					className={`lj-select ${error ? "error" : ""}`}
					aria-invalid={error ? "true" : "false"}
					aria-describedby={error ? `${selectId}-error` : undefined}
					{...props}
				>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				{error && (
					<span id={`${selectId}-error`} className="lj-select-error">
						{error}
					</span>
				)}
			</div>
		);
	},
);

Select.displayName = "Select";
