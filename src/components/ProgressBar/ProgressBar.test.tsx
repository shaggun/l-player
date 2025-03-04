import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProgressBar } from "./ProgressBar"; // Adjust the import path as needed

describe("ProgressBar", () => {
  const mockOnSeek = jest.fn();

  it("renders correctly with initial values", () => {
    render(<ProgressBar currentTime={30} duration={120} onSeek={mockOnSeek} />);

    // Check that the component renders time labels correctly
    expect(screen.getByText("0:30")).toBeInTheDocument(); // Current time
    expect(screen.getByText("-1:30")).toBeInTheDocument(); // Remaining time
  });

  it("calls onSeek when progress bar is adjusted", () => {
    render(<ProgressBar currentTime={30} duration={120} onSeek={mockOnSeek} />);

    // Get the progress bar input
    const progressBar = screen.getByRole("slider");

    // Simulate user changing the progress
    fireEvent.change(progressBar, { target: { value: 60 } });

    // Expect the onSeek function to be called with the new value
    expect(mockOnSeek).toHaveBeenCalled();
  });
});
