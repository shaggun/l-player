import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PlaylistSidebar } from './PlaylistSidebar';

const mockPlaylists = [{ name: 'Deep House' }, { name: 'Chill Vibes' }];

describe('PlaylistSidebar', () => {
  it('renders playlist names', () => {
    const { getByText } = render(
      <PlaylistSidebar playlists={mockPlaylists} selectedIndex={0} onSelect={() => {}} />
    );
    expect(getByText('Deep House')).toBeInTheDocument();
    expect(getByText('Chill Vibes')).toBeInTheDocument();
  });

  it('calls onSelect when clicking a playlist', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <PlaylistSidebar playlists={mockPlaylists} selectedIndex={0} onSelect={onSelect} />
    );
    fireEvent.click(getByText('Chill Vibes'));
    expect(onSelect).toHaveBeenCalledWith(1);
  });
});
