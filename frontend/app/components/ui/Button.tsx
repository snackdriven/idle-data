import { memo } from "react";
import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "danger";
	isLoading?: boolean;
	size?: "sm" | "md" | "lg";
}

function ButtonComponent({
	children,
	variant = "primary",
	isLoading = false,
	size = "md",
	className = "",
	disabled,
	...props
}: ButtonProps) {
	return (
		<button
			className={`app-button app-button-${variant} app-button-${size} ${
				isLoading ? "loading" : ""
			} ${className}`}
			disabled={isLoading || disabled}
			{...props}
		>
			{isLoading ? (
				<span className="app-button-loader" aria-hidden="true">
					●
				</span>
			) : null}
			<span className={isLoading ? "app-button-text-loading" : ""}>
				{children}
			</span>
		</button>
	);
}

export const Button = memo(ButtonComponent);
