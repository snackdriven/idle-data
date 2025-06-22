import type { Meta, StoryObj } from "@storybook/react";
import { Toast, ToastContainer } from "./Toast";
import { Button } from "./Button";
import { useState } from "react";

const meta = {
	title: "UI/Toast",
	component: Toast,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: { type: "select" },
			options: ["success", "error", "warning", "info"],
		},
		duration: {
			control: { type: "number" },
		},
	},
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
	args: {
		type: "success",
		title: "Success!",
		description: "Your changes have been saved successfully.",
	},
	render: (args) => (
		<ToastContainer>
			<Toast {...args} />
		</ToastContainer>
	),
};

export const Error: Story = {
	args: {
		type: "error",
		title: "Error occurred",
		description: "Something went wrong. Please try again.",
	},
	render: (args) => (
		<ToastContainer>
			<Toast {...args} />
		</ToastContainer>
	),
};

export const Warning: Story = {
	args: {
		type: "warning",
		title: "Warning",
		description: "Please review your changes before proceeding.",
	},
	render: (args) => (
		<ToastContainer>
			<Toast {...args} />
		</ToastContainer>
	),
};

export const Info: Story = {
	args: {
		type: "info",
		title: "Information",
		description: "New features are now available!",
	},
	render: (args) => (
		<ToastContainer>
			<Toast {...args} />
		</ToastContainer>
	),
};

export const WithAction: Story = {
	args: {
		type: "info",
		title: "Update available",
		description: "A new version of the app is available.",
		action: {
			label: "Update",
			onClick: () => alert("Update clicked!"),
		},
	},
	render: (args) => (
		<ToastContainer>
			<Toast {...args} />
		</ToastContainer>
	),
};

export const TitleOnly: Story = {
	args: {
		type: "success",
		title: "Saved!",
	},
	render: (args) => (
		<ToastContainer>
			<Toast {...args} />
		</ToastContainer>
	),
};

export const CustomContent: Story = {
	args: {
		type: "info",
		title: "Custom content",
		children: (
			<div style={{ marginTop: "0.5rem" }}>
				<p
					style={{
						margin: "0 0 0.5rem 0",
						fontSize: "0.75rem",
						color: "var(--color-text-secondary)",
					}}
				>
					This toast contains custom content with buttons.
				</p>
				<div style={{ display: "flex", gap: "0.5rem" }}>
					<button
						style={{
							padding: "0.25rem 0.5rem",
							fontSize: "0.75rem",
							border: "1px solid var(--color-border)",
							borderRadius: "0.25rem",
							background: "var(--color-bg-primary)",
						}}
					>
						Learn more
					</button>
					<button
						style={{
							padding: "0.25rem 0.5rem",
							fontSize: "0.75rem",
							border: "none",
							borderRadius: "0.25rem",
							background: "var(--color-primary-500)",
							color: "white",
						}}
					>
						Get started
					</button>
				</div>
			</div>
		),
	},
	render: (args) => (
		<ToastContainer>
			<Toast {...args} />
		</ToastContainer>
	),
};

export const MultipleToasts: Story = {
	render: () => (
		<ToastContainer>
			<Toast
				type="success"
				title="Upload complete"
				description="Your file has been uploaded successfully."
			/>
			<Toast
				type="warning"
				title="Storage almost full"
				description="You're using 95% of your storage space."
				action={{ label: "Upgrade", onClick: () => alert("Upgrade clicked!") }}
			/>
			<Toast
				type="info"
				title="New message"
				description="You have 3 new messages in your inbox."
			/>
		</ToastContainer>
	),
};

export const InteractiveDemo: Story = {
	render: () => {
		const ToastDemo = () => {
			const [toasts, setToasts] = useState<Array<{ id: number; props: any }>>(
				[],
			);
			let nextId = 1;

			const addToast = (props: any) => {
				const id = nextId++;
				setToasts((prev) => [...prev, { id, props }]);
			};

			const removeToast = (id: number) => {
				setToasts((prev) => prev.filter((toast) => toast.id !== id));
			};

			return (
				<div style={{ padding: "2rem" }}>
					<div
						style={{
							display: "flex",
							gap: "1rem",
							marginBottom: "2rem",
							flexWrap: "wrap",
						}}
					>
						<Button
							variant="primary"
							onClick={() =>
								addToast({
									type: "success",
									title: "Success!",
									description: "Operation completed successfully.",
								})
							}
						>
							Success Toast
						</Button>
						<Button
							variant="secondary"
							onClick={() =>
								addToast({
									type: "error",
									title: "Error!",
									description: "Something went wrong.",
								})
							}
						>
							Error Toast
						</Button>
						<Button
							variant="secondary"
							onClick={() =>
								addToast({
									type: "warning",
									title: "Warning!",
									description: "Please check your input.",
								})
							}
						>
							Warning Toast
						</Button>
						<Button
							variant="secondary"
							onClick={() =>
								addToast({
									type: "info",
									title: "Info",
									description: "Here's some useful information.",
									action: {
										label: "Learn more",
										onClick: () => alert("Action clicked!"),
									},
								})
							}
						>
							Info Toast
						</Button>
					</div>

					<ToastContainer position="top-right">
						{toasts.map((toast) => (
							<Toast
								key={toast.id}
								{...toast.props}
								onClose={() => removeToast(toast.id)}
								duration={0} // Disable auto-close for demo
							/>
						))}
					</ToastContainer>
				</div>
			);
		};

		return <ToastDemo />;
	},
};
