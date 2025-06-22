import { forwardRef, useEffect, useState, type HTMLAttributes } from "react";

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	type: "success" | "error" | "warning" | "info";
	title: string;
	description?: string;
	duration?: number;
	onClose?: () => void;
	action?: {
		label: string;
		onClick: () => void;
	};
	children?: React.ReactNode;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
	({ type, title, description, duration = 5000, onClose, action, className = "", children, ...props }, ref) => {
		const [isVisible, setIsVisible] = useState(true);
		const [isExiting, setIsExiting] = useState(false);

		useEffect(() => {
			if (duration > 0) {
				const timer = setTimeout(() => {
					handleClose();
				}, duration);

				return () => clearTimeout(timer);
			}
		}, [duration]);

		const handleClose = () => {
			setIsExiting(true);
			setTimeout(() => {
				setIsVisible(false);
				onClose?.();
			}, 200);
		};

		if (!isVisible) return null;

		const typeIcons = {
			success: "✓",
			error: "✕",
			warning: "⚠",
			info: "ℹ",
		};

		const baseClasses = "toast";
		const typeClasses = {
			success: "toast--success",
			error: "toast--error",
			warning: "toast--warning",
			info: "toast--info",
		};
		const exitClass = isExiting ? "toast--exiting" : "";

		const classes = [baseClasses, typeClasses[type], exitClass, className].filter(Boolean).join(" ");

		return (
			<div ref={ref} className={classes} role="alert" aria-live="polite" {...props}>
				<div className="toast__icon" aria-hidden="true">
					{typeIcons[type]}
				</div>
				<div className="toast__content">
					<div className="toast__title">{title}</div>
					{description && <div className="toast__description">{description}</div>}
					{children}
				</div>
				<div className="toast__actions">
					{action && (
						<button
							type="button"
							className="toast__action"
							onClick={action.onClick}
							aria-label={action.label}
						>
							{action.label}
						</button>
					)}
					<button
						type="button"
						className="toast__close"
						onClick={handleClose}
						aria-label="Close notification"
					>
						✕
					</button>
				</div>
			</div>
		);
	},
);

Toast.displayName = "Toast";

export interface ToastContainerProps {
	position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
	children: React.ReactNode;
}

export const ToastContainer = ({ position = "top-right", children }: ToastContainerProps) => {
	const positionClasses = {
		"top-right": "toast-container--top-right",
		"top-left": "toast-container--top-left",
		"bottom-right": "toast-container--bottom-right",
		"bottom-left": "toast-container--bottom-left",
		"top-center": "toast-container--top-center",
		"bottom-center": "toast-container--bottom-center",
	};

	const classes = ["toast-container", positionClasses[position]].join(" ");

	return (
		<div className={classes} role="region" aria-label="Notifications">
			{children}
		</div>
	);
};