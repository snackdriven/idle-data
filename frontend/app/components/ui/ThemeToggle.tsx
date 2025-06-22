import { forwardRef, type ButtonHTMLAttributes } from "react";
import { useTheme } from "../../contexts/ThemeContext";

export interface ThemeToggleProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
	size?: "sm" | "md" | "lg";
	variant?: "button" | "icon";
	showLabel?: boolean;
}

export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
	(
		{
			size = "md",
			variant = "button",
			showLabel = true,
			className = "",
			...props
		},
		ref,
	) => {
		const { theme, toggleTheme } = useTheme();

		const sizeClasses = {
			sm: "theme-toggle--sm",
			md: "theme-toggle--md",
			lg: "theme-toggle--lg",
		};

		const variantClasses = {
			button: "theme-toggle--button",
			icon: "theme-toggle--icon",
		};

		const baseClasses = "theme-toggle";
		const classes = [
			baseClasses,
			sizeClasses[size],
			variantClasses[variant],
			className,
		]
			.filter(Boolean)
			.join(" ");

		const isDark = theme === "dark";
		const icon = isDark ? "☀️" : "🌙";
		const label = isDark ? "Switch to light mode" : "Switch to dark mode";
		const text = isDark ? "Light" : "Dark";

		return (
			<button
				ref={ref}
				type="button"
				className={classes}
				onClick={toggleTheme}
				aria-label={label}
				title={label}
				{...props}
			>
				<span className="theme-toggle__icon" aria-hidden="true">
					{icon}
				</span>
				{variant === "button" && showLabel && (
					<span className="theme-toggle__text">{text}</span>
				)}
			</button>
		);
	},
);

ThemeToggle.displayName = "ThemeToggle";
