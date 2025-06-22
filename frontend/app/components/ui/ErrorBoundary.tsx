import React, { Component, type ErrorInfo, type ReactNode } from "react";
import { Card, CardContent } from "./Card";
import { Button } from "./Button";

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
	errorInfo?: ErrorInfo;
}

/**
 * ErrorBoundary component that catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the entire application.
 * 
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <SomeComponentThatMightError />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		// Update state so the next render will show the fallback UI
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		// Log error details for debugging
		console.error("ErrorBoundary caught an error:", error, errorInfo);
		
		// Update state with error info
		this.setState({ errorInfo });

		// Call optional error handler
		this.props.onError?.(error, errorInfo);

		// TODO: Send error to monitoring service (e.g., Sentry, LogRocket)
		// Example: Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
	}

	private handleRetry = (): void => {
		this.setState({ hasError: false, error: undefined, errorInfo: undefined });
	};

	private handleReload = (): void => {
		window.location.reload();
	};

	render(): ReactNode {
		if (this.state.hasError) {
			// Custom fallback UI
			if (this.props.fallback) {
				return this.props.fallback;
			}

			// Default fallback UI
			return (
				<Card variant="outlined" padding="lg">
					<CardContent>
						<div role="alert" style={{ textAlign: "center" }}>
							<h2 style={{ 
								color: "var(--color-danger)", 
								margin: "0 0 var(--space-4) 0",
								fontSize: "var(--font-size-xl)"
							}}>
								Oops! Something went wrong
							</h2>
							
							<p style={{ 
								color: "var(--color-text-secondary)", 
								margin: "0 0 var(--space-6) 0",
								fontSize: "var(--font-size-base)"
							}}>
								We encountered an unexpected error. You can try refreshing the page or going back to continue.
							</p>

							{process.env.NODE_ENV === "development" && this.state.error && (
								<details style={{ 
									margin: "var(--space-4) 0", 
									textAlign: "left",
									background: "var(--color-bg-secondary)",
									padding: "var(--space-3)",
									borderRadius: "var(--radius-base)",
									border: "1px solid var(--color-border)"
								}}>
									<summary style={{ 
										cursor: "pointer", 
										fontWeight: "var(--font-weight-medium)",
										marginBottom: "var(--space-2)"
									}}>
										Error Details (Development Only)
									</summary>
									<pre style={{ 
										fontSize: "var(--font-size-xs)", 
										overflow: "auto",
										margin: 0,
										color: "var(--color-text-secondary)"
									}}>
										{this.state.error.toString()}
										{this.state.errorInfo?.componentStack && (
											<>\n\nComponent Stack:\n{this.state.errorInfo.componentStack}</>
										)}
									</pre>
								</details>
							)}

							<div style={{ 
								display: "flex", 
								gap: "var(--space-3)", 
								justifyContent: "center",
								flexWrap: "wrap"
							}}>
								<Button variant="primary" onClick={this.handleRetry}>
									Try Again
								</Button>
								<Button variant="secondary" onClick={this.handleReload}>
									Reload Page
								</Button>
								<Button 
									variant="secondary" 
									onClick={() => window.history.back()}
								>
									Go Back
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			);
		}

		return this.props.children;
	}
}

/**
 * Higher-order component that wraps a component with an ErrorBoundary
 * 
 * @example
 * ```tsx
 * const SafeComponent = withErrorBoundary(MyComponent);
 * ```
 */
export function withErrorBoundary<P extends object>(
	WrappedComponent: React.ComponentType<P>,
	fallback?: ReactNode
) {
	const WithErrorBoundaryComponent = (props: P) => (
		<ErrorBoundary fallback={fallback}>
			<WrappedComponent {...props} />
		</ErrorBoundary>
	);

	WithErrorBoundaryComponent.displayName = `withErrorBoundary(${
		WrappedComponent.displayName || WrappedComponent.name || "Component"
	})`;

	return WithErrorBoundaryComponent;
}

/**
 * Hook for triggering errors in development/testing
 * 
 * @example
 * ```tsx
 * const triggerError = useErrorHandler();
 * // triggerError(new Error("Test error"));
 * ```
 */
export function useErrorHandler() {
	return (error: Error) => {
		throw error;
	};
}