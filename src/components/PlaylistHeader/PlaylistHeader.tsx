import React from 'react';
import { TrackArt } from '../TrackArt/TrackArt';


interface Track {
  name: string;
  url: string;
  duration: number;
}

interface Playlist {
  name: string;
  artist?: string;
  year?: number;
  tracks: Track[];
}

interface PlaylistHeaderProps {
  currentPlaylist: Playlist;
  currentTrack: Track;
}

export const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({
  currentPlaylist,
  currentTrack,
}) => {
  return (
    <div className='playlist-info'>
      <TrackArt playlistName={currentPlaylist.name} />
      <div className='playlist-info__details'>
        <p className='playlist-info__name'>{currentPlaylist.name}</p>
        {currentPlaylist.artist && (
          <p className='playlist-info__artist'>
            {currentPlaylist.artist} {currentPlaylist.year && `- ${currentPlaylist.year}`}
          </p>
        )}
        <div className='playlist-info__now-playing'>
          Now Playing: {currentTrack.name}
        </div>
      </div>
    </div>
  );
};
