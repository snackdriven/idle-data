import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardContent, CardFooter } from "./Card";
import { Button } from "./Button";

const meta = {
	title: "UI/Card",
	component: Card,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: { type: "select" },
			options: ["elevated", "outlined", "filled"],
		},
		padding: {
			control: { type: "select" },
			options: ["none", "sm", "md", "lg"],
		},
		clickable: {
			control: { type: "boolean" },
		},
	},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		variant: "outlined",
		padding: "md",
		children: (
			<>
				<CardHeader>
					<h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: 600 }}>
						Card Title
					</h3>
				</CardHeader>
				<CardContent>
					<p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
						This is the card content. It can contain any kind of content
						including text, images, or other components.
					</p>
				</CardContent>
				<CardFooter>
					<Button variant="secondary" size="sm">
						Cancel
					</Button>
					<Button variant="primary" size="sm">
						Save
					</Button>
				</CardFooter>
			</>
		),
	},
};

export const Elevated: Story = {
	args: {
		variant: "elevated",
		padding: "lg",
		children: (
			<>
				<CardHeader>
					<h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
						Elevated Card
					</h3>
				</CardHeader>
				<CardContent>
					<p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
						This card has a shadow and elevated appearance. Perfect for
						highlighting important content.
					</p>
				</CardContent>
			</>
		),
	},
};

export const Filled: Story = {
	args: {
		variant: "filled",
		padding: "md",
		children: (
			<>
				<CardHeader>
					<h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: 600 }}>
						Filled Card
					</h3>
				</CardHeader>
				<CardContent>
					<p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
						This card has a filled background color. Great for grouping related
						content.
					</p>
				</CardContent>
			</>
		),
	},
};

export const Clickable: Story = {
	args: {
		variant: "outlined",
		padding: "md",
		clickable: true,
		onClick: () => alert("Card clicked!"),
		children: (
			<>
				<CardHeader>
					<h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: 600 }}>
						Clickable Card
					</h3>
				</CardHeader>
				<CardContent>
					<p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
						Click anywhere on this card to trigger the onClick handler. Notice
						the hover effect.
					</p>
				</CardContent>
			</>
		),
	},
};

export const NoPadding: Story = {
	args: {
		variant: "outlined",
		padding: "none",
		children: (
			<>
				<div style={{ padding: "1rem 1rem 0 1rem" }}>
					<CardHeader>
						<h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: 600 }}>
							No Padding Card
						</h3>
					</CardHeader>
				</div>
				<div
					style={{
						backgroundImage:
							"linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)",
						backgroundSize: "20px 20px",
						backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
						height: "100px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "var(--color-text-muted)",
						fontSize: "0.875rem",
					}}
				>
					Full-width content area
				</div>
				<div style={{ padding: "0 1rem 1rem 1rem" }}>
					<CardFooter>
						<Button variant="primary" size="sm">
							Action
						</Button>
					</CardFooter>
				</div>
			</>
		),
	},
};

export const SimpleContent: Story = {
	args: {
		variant: "elevated",
		padding: "md",
		children: (
			<div>
				<h4
					style={{ margin: "0 0 0.5rem 0", fontSize: "1rem", fontWeight: 600 }}
				>
					Simple Card
				</h4>
				<p
					style={{
						margin: 0,
						fontSize: "0.875rem",
						color: "var(--color-text-secondary)",
					}}
				>
					Sometimes you just need a simple card without the
					header/content/footer structure.
				</p>
			</div>
		),
	},
};
