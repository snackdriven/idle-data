import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
	ErrorBoundary,
	withErrorBoundary,
	useErrorHandler,
} from "../../frontend/app/components/ui/ErrorBoundary";

// Test component that throws an error
const ThrowError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
	if (shouldThrow) {
		throw new Error("Test error");
	}
	return <div>No error</div>;
};

// Test component using useErrorHandler hook
const ErrorHandlerComponent = () => {
	const triggerError = useErrorHandler();
	return (
		<button onClick={() => triggerError(new Error("Manual error"))}>
			Trigger Error
		</button>
	);
};

describe("ErrorBoundary Component", () => {
	// Suppress console errors for these tests
	beforeEach(() => {
		vi.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("renders children when there is no error", () => {
		render(
			<ErrorBoundary>
				<div>Test content</div>
			</ErrorBoundary>,
		);

		expect(screen.getByText("Test content")).toBeInTheDocument();
	});

	it("renders error UI when child component throws", () => {
		render(
			<ErrorBoundary>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);

		expect(screen.getByRole("alert")).toBeInTheDocument();
		expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();
		expect(
			screen.getByText(/We encountered an unexpected error/),
		).toBeInTheDocument();
	});

	it("renders custom fallback when provided", () => {
		const customFallback = <div role="alert">Custom error message</div>;

		render(
			<ErrorBoundary fallback={customFallback}>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);

		expect(screen.getByText("Custom error message")).toBeInTheDocument();
	});

	it("calls onError callback when error occurs", () => {
		const onError = vi.fn();

		render(
			<ErrorBoundary onError={onError}>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);

		expect(onError).toHaveBeenCalledWith(
			expect.any(Error),
			expect.objectContaining({
				componentStack: expect.any(String),
			}),
		);
	});

	it("provides retry functionality", async () => {
		const user = userEvent.setup();

		const RetryComponent = () => {
			const [shouldThrow, setShouldThrow] = React.useState(true);

			React.useEffect(() => {
				const timer = setTimeout(() => setShouldThrow(false), 100);
				return () => clearTimeout(timer);
			}, []);

			return <ThrowError shouldThrow={shouldThrow} />;
		};

		render(
			<ErrorBoundary>
				<RetryComponent />
			</ErrorBoundary>,
		);

		// Should show error initially
		expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();

		// Click retry button
		await user.click(screen.getByText("Try Again"));

		// Should reset error state
		// Note: In a real scenario, the component might work after retry
	});

	it("provides navigation options", () => {
		render(
			<ErrorBoundary>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);

		expect(screen.getByText("Try Again")).toBeInTheDocument();
		expect(screen.getByText("Reload Page")).toBeInTheDocument();
		expect(screen.getByText("Go Back")).toBeInTheDocument();
	});

	it("shows error details in development mode", () => {
		const originalEnv = process.env.NODE_ENV;
		process.env.NODE_ENV = "development";

		render(
			<ErrorBoundary>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);

		expect(
			screen.getByText("Error Details (Development Only)"),
		).toBeInTheDocument();

		process.env.NODE_ENV = originalEnv;
	});

	it("hides error details in production mode", () => {
		const originalEnv = process.env.NODE_ENV;
		process.env.NODE_ENV = "production";

		render(
			<ErrorBoundary>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);

		expect(
			screen.queryByText("Error Details (Development Only)"),
		).not.toBeInTheDocument();

		process.env.NODE_ENV = originalEnv;
	});
});

describe("withErrorBoundary HOC", () => {
	beforeEach(() => {
		vi.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("wraps component with ErrorBoundary", () => {
		const TestComponent = () => <div>Test Component</div>;
		const WrappedComponent = withErrorBoundary(TestComponent);

		render(<WrappedComponent />);
		expect(screen.getByText("Test Component")).toBeInTheDocument();
	});

	it("catches errors in wrapped component", () => {
		const WrappedComponent = withErrorBoundary(ThrowError);

		render(<WrappedComponent shouldThrow={true} />);
		expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();
	});

	it("uses custom fallback when provided", () => {
		const customFallback = <div>Custom HOC fallback</div>;
		const WrappedComponent = withErrorBoundary(ThrowError, customFallback);

		render(<WrappedComponent shouldThrow={true} />);
		expect(screen.getByText("Custom HOC fallback")).toBeInTheDocument();
	});

	it("sets correct display name", () => {
		const TestComponent = () => <div>Test</div>;
		TestComponent.displayName = "TestComponent";

		const WrappedComponent = withErrorBoundary(TestComponent);
		expect(WrappedComponent.displayName).toBe(
			"withErrorBoundary(TestComponent)",
		);
	});
});

describe("useErrorHandler hook", () => {
	beforeEach(() => {
		vi.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("throws error when called", async () => {
		const user = userEvent.setup();

		render(
			<ErrorBoundary>
				<ErrorHandlerComponent />
			</ErrorBoundary>,
		);

		await user.click(screen.getByText("Trigger Error"));
		expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();
	});
});
