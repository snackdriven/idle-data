import type { Meta, StoryObj } from "@storybook/react";
import {
	ErrorBoundary,
	withErrorBoundary,
	useErrorHandler,
} from "./ErrorBoundary";
import { Button } from "./Button";

const meta = {
	title: "UI/ErrorBoundary",
	component: ErrorBoundary,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

// Component that throws an error for testing
const ErrorThrowingComponent = ({
	shouldThrow = false,
}: { shouldThrow?: boolean }) => {
	if (shouldThrow) {
		throw new Error("This is a test error thrown by the component!");
	}
	return <div>This component is working fine!</div>;
};

// Component that can trigger errors on demand
const ErrorTriggerComponent = () => {
	const triggerError = useErrorHandler();

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
				alignItems: "center",
			}}
		>
			<p>This component is working normally.</p>
			<Button
				variant="danger"
				onClick={() =>
					triggerError(new Error("Manually triggered error for testing!"))
				}
			>
				Trigger Error
			</Button>
		</div>
	);
};

export const Default: Story = {
	args: {
		children: <div>This content is protected by the ErrorBoundary.</div>,
	},
};

export const WithError: Story = {
	args: {
		children: <ErrorThrowingComponent shouldThrow={true} />,
	},
};

export const WithCustomFallback: Story = {
	args: {
		children: <ErrorThrowingComponent shouldThrow={true} />,
		fallback: (
			<div
				style={{
					padding: "2rem",
					textAlign: "center",
					background: "#fee2e2",
					border: "1px solid #fecaca",
					borderRadius: "0.5rem",
				}}
			>
				<h3 style={{ color: "#dc2626", margin: "0 0 1rem 0" }}>
					Custom Error Fallback
				</h3>
				<p style={{ margin: 0 }}>
					Something went wrong with this custom fallback UI.
				</p>
			</div>
		),
	},
};

export const WithErrorHandler: Story = {
	args: {
		children: <ErrorThrowingComponent shouldThrow={true} />,
		onError: (error, errorInfo) => {
			console.log("Custom error handler called:", error, errorInfo);
			// In a real app, you might send this to a monitoring service
		},
	},
};

export const InteractiveErrorTrigger: Story = {
	args: {
		children: <ErrorTriggerComponent />,
	},
};

export const NestedErrorBoundaries: Story = {
	render: () => (
		<ErrorBoundary>
			<div
				style={{
					padding: "1rem",
					border: "2px solid #3b82f6",
					borderRadius: "0.5rem",
				}}
			>
				<h3>Outer ErrorBoundary</h3>
				<p>This content is protected by the outer error boundary.</p>

				<ErrorBoundary
					fallback={
						<div
							style={{
								padding: "1rem",
								background: "#fef3c7",
								border: "1px solid #f59e0b",
								borderRadius: "0.25rem",
								margin: "1rem 0",
							}}
						>
							<strong>Inner Error Boundary:</strong> A nested component failed.
						</div>
					}
				>
					<div
						style={{
							padding: "1rem",
							border: "2px solid #10b981",
							borderRadius: "0.5rem",
						}}
					>
						<h4>Inner ErrorBoundary</h4>
						<p>This content is protected by a nested error boundary.</p>
						<ErrorThrowingComponent shouldThrow={true} />
					</div>
				</ErrorBoundary>

				<p>
					This content continues to work even if the nested component fails.
				</p>
			</div>
		</ErrorBoundary>
	),
};

// Example using the HOC
const ComponentWithHOC = withErrorBoundary(() => {
	return (
		<div style={{ padding: "1rem" }}>
			<h3>Component wrapped with HOC</h3>
			<ErrorThrowingComponent shouldThrow={true} />
		</div>
	);
});

export const WithHOC: Story = {
	render: () => <ComponentWithHOC />,
};
