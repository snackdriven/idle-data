import { forwardRef, type HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	variant?: "elevated" | "outlined" | "filled";
	padding?: "none" | "sm" | "md" | "lg";
	clickable?: boolean;
	children: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
	({ variant = "outlined", padding = "md", clickable = false, className = "", children, ...props }, ref) => {
		const baseClasses = "card";
		const variantClasses = {
			elevated: "card--elevated",
			outlined: "card--outlined",
			filled: "card--filled",
		};
		const paddingClasses = {
			none: "card--padding-none",
			sm: "card--padding-sm",
			md: "card--padding-md",
			lg: "card--padding-lg",
		};
		const clickableClass = clickable ? "card--clickable" : "";

		const classes = [
			baseClasses,
			variantClasses[variant],
			paddingClasses[padding],
			clickableClass,
			className,
		]
			.filter(Boolean)
			.join(" ");

		return (
			<div ref={ref} className={classes} {...props}>
				{children}
			</div>
		);
	},
);

Card.displayName = "Card";

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
	({ className = "", children, ...props }, ref) => {
		return (
			<div ref={ref} className={`card__header ${className}`} {...props}>
				{children}
			</div>
		);
	},
);

CardHeader.displayName = "CardHeader";

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
	({ className = "", children, ...props }, ref) => {
		return (
			<div ref={ref} className={`card__content ${className}`} {...props}>
				{children}
			</div>
		);
	},
);

CardContent.displayName = "CardContent";

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
	({ className = "", children, ...props }, ref) => {
		return (
			<div ref={ref} className={`card__footer ${className}`} {...props}>
				{children}
			</div>
		);
	},
);

CardFooter.displayName = "CardFooter";