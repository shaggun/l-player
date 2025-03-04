import React from 'react';

interface Playlist {
  name: string;
}

interface PlaylistSidebarProps {
  playlists: Playlist[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export const PlaylistSidebar: React.FC<PlaylistSidebarProps> = ({
  playlists,
  selectedIndex,
  onSelect,
}) => {
  return (
    <aside>
      <p className='subtitle'>Playlists</p>
      <ul className='playlist'>
        {playlists.map((playlist, index) => (
          <li
            key={playlist.name}
            onClick={() => onSelect(index)}
            className='playlist-item'
            role='button'
            aria-label={`Select playlist: ${playlist.name}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onSelect(index);
              }
            }}
            style={{
              backgroundColor: index === selectedIndex ? '#232329' : 'transparent',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = index === selectedIndex ? '#232329' : '#1A1B1C'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index === selectedIndex ? '#232329' : 'transparent'}
          >
            {playlist.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};
