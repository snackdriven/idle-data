import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeProvider } from "../../contexts/ThemeContext";

const meta = {
	title: "UI/ThemeToggle",
	component: ThemeToggle,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: { type: "select" },
			options: ["sm", "md", "lg"],
		},
		variant: {
			control: { type: "select" },
			options: ["button", "icon"],
		},
		showLabel: {
			control: { type: "boolean" },
		},
	},
	decorators: [
		(Story) => (
			<ThemeProvider>
				<Story />
			</ThemeProvider>
		),
	],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		size: "md",
		variant: "button",
		showLabel: true,
	},
};

export const IconOnly: Story = {
	args: {
		size: "md",
		variant: "icon",
		showLabel: false,
	},
};

export const Small: Story = {
	args: {
		size: "sm",
		variant: "button",
		showLabel: true,
	},
};

export const Large: Story = {
	args: {
		size: "lg",
		variant: "button",
		showLabel: true,
	},
};

export const SmallIcon: Story = {
	args: {
		size: "sm",
		variant: "icon",
		showLabel: false,
	},
};

export const LargeIcon: Story = {
	args: {
		size: "lg",
		variant: "icon",
		showLabel: false,
	},
};

export const NoLabel: Story = {
	args: {
		size: "md",
		variant: "button",
		showLabel: false,
	},
};

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
			<div>
				<h4 style={{ margin: "0 0 0.5rem 0", fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
					Button Variants
				</h4>
				<div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
					<ThemeToggle size="sm" variant="button" />
					<ThemeToggle size="md" variant="button" />
					<ThemeToggle size="lg" variant="button" />
				</div>
			</div>
			<div>
				<h4 style={{ margin: "0 0 0.5rem 0", fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
					Icon Variants
				</h4>
				<div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
					<ThemeToggle size="sm" variant="icon" />
					<ThemeToggle size="md" variant="icon" />
					<ThemeToggle size="lg" variant="icon" />
				</div>
			</div>
		</div>
	),
};