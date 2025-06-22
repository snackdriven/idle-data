import type { Meta, StoryObj } from "@storybook/react";
import { LoadingSkeleton } from "./LoadingSkeleton";

const meta = {
	title: "UI/LoadingSkeleton",
	component: LoadingSkeleton,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		width: {
			control: "text",
		},
		height: {
			control: "text",
		},
	},
} satisfies Meta<typeof LoadingSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		width: "200px",
		height: "20px",
	},
};

export const Large: Story = {
	args: {
		width: "300px",
		height: "40px",
	},
};

export const CardLayout = () => (
	<div style={{ width: "300px", padding: "1rem" }}>
		<LoadingSkeleton height="200px" />
		<div style={{ marginTop: "1rem" }}>
			<LoadingSkeleton height="24px" width="80%" />
		</div>
		<div style={{ marginTop: "0.5rem" }}>
			<LoadingSkeleton height="16px" width="60%" />
		</div>
	</div>
);

export const TextLines = () => (
	<div style={{ width: "400px" }}>
		<LoadingSkeleton height="16px" width="100%" />
		<div style={{ marginTop: "0.5rem" }}>
			<LoadingSkeleton height="16px" width="90%" />
		</div>
		<div style={{ marginTop: "0.5rem" }}>
			<LoadingSkeleton height="16px" width="95%" />
		</div>
	</div>
);
