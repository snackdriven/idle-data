import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../../frontend/app/components/ui/Button";

describe("Button Component", () => {
	it("renders children correctly", () => {
		render(<Button>Click me</Button>);
		expect(
			screen.getByRole("button", { name: "Click me" }),
		).toBeInTheDocument();
	});

	it("applies correct variant classes", () => {
		const { rerender } = render(<Button variant="primary">Primary</Button>);
		expect(screen.getByRole("button")).toHaveClass("lj-button-primary");

		rerender(<Button variant="secondary">Secondary</Button>);
		expect(screen.getByRole("button")).toHaveClass("lj-button-secondary");

		rerender(<Button variant="danger">Danger</Button>);
		expect(screen.getByRole("button")).toHaveClass("lj-button-danger");
	});

	it("applies correct size classes", () => {
		const { rerender } = render(<Button size="sm">Small</Button>);
		expect(screen.getByRole("button")).toHaveClass("lj-button-sm");

		rerender(<Button size="md">Medium</Button>);
		expect(screen.getByRole("button")).toHaveClass("lj-button-md");

		rerender(<Button size="lg">Large</Button>);
		expect(screen.getByRole("button")).toHaveClass("lj-button-lg");
	});

	it("shows loading state correctly", () => {
		render(<Button isLoading>Loading</Button>);
		const button = screen.getByRole("button");

		expect(button).toHaveClass("loading");
		expect(button).toBeDisabled();
		expect(screen.getByText("●")).toBeInTheDocument(); // loader icon
		expect(screen.getByText("Loading")).toHaveClass("lj-button-text-loading");
	});

	it("handles click events", async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();

		render(<Button onClick={handleClick}>Click me</Button>);

		await user.click(screen.getByRole("button"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("does not trigger click when disabled", async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();

		render(
			<Button onClick={handleClick} disabled>
				Disabled
			</Button>,
		);

		await user.click(screen.getByRole("button"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("does not trigger click when loading", async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();

		render(
			<Button onClick={handleClick} isLoading>
				Loading
			</Button>,
		);

		await user.click(screen.getByRole("button"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies custom className", () => {
		render(<Button className="custom-class">Button</Button>);
		expect(screen.getByRole("button")).toHaveClass("custom-class");
	});

	it("forwards additional props", () => {
		render(
			<Button data-testid="custom-button" aria-label="Custom button">
				Button
			</Button>,
		);
		const button = screen.getByTestId("custom-button");

		expect(button).toHaveAttribute("aria-label", "Custom button");
	});

	it("has correct default props", () => {
		render(<Button>Default</Button>);
		const button = screen.getByRole("button");

		expect(button).toHaveClass("lj-button-primary"); // default variant
		expect(button).toHaveClass("lj-button-md"); // default size
		expect(button).not.toBeDisabled();
		expect(button).not.toHaveClass("loading");
	});
});
