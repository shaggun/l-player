import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders playlist and tracklist', () => {
    const { getByText } = render(<App />);
    expect(getByText('Playlists')).toBeInTheDocument();
  });

  it('plays and pauses tracks', () => {
    const { getByLabelText } = render(<App />);
    const playButton = getByLabelText('Play');

    fireEvent.click(playButton); // Click play
    expect(playButton.getAttribute('aria-label')).toBe('Pause');

    fireEvent.click(playButton); // Click pause
    expect(playButton.getAttribute('aria-label')).toBe('Play');
  });

  it("changes tracks when clicking next", async () => {
    render(<App />);

    const nextButton = screen.getByRole("button", { name: "Next Track" });

    // Click "Next Track"
    fireEvent.click(nextButton);

    // Wait for the "Now Playing" text to update
    await waitFor(() => {
      expect(screen.getByText(/Now Playing:/i)).toBeInTheDocument();
    });
  });
});
