import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TrackList } from './TrackList';

const mockTracks = [
  { name: 'Song 1', url: 'song1.mp3', duration: 120 },
  { name: 'Song 2', url: 'song2.mp3', duration: 180 }
];

describe('TrackList', () => {
  it('renders track names', () => {
    const { getByText } = render(
      <TrackList tracks={mockTracks} currentTrackIndex={0} onTrackSelect={() => {}} />
    );
    expect(getByText('Song 1')).toBeInTheDocument();
    expect(getByText('Song 2')).toBeInTheDocument();
  });

  it('calls onTrackSelect when clicking a track', () => {
    const onTrackSelect = jest.fn();
    const { getByText } = render(
      <TrackList tracks={mockTracks} currentTrackIndex={0} onTrackSelect={onTrackSelect} />
    );
    fireEvent.click(getByText('Song 2'));
    expect(onTrackSelect).toHaveBeenCalledWith(1);
  });
});
