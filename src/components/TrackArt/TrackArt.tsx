import React from 'react';

interface TrackArtProps {
  imageUrl?: string;
  // Optionally, you might accept a playlist name if imageUrl isn't provided.
  playlistName?: string;
}

function getImagePath(
  identifier: string,
  options?: { basePath?: string; ext?: string }
): string {
  // If the identifier is a full URL, return it unchanged.
  if (identifier.startsWith('http://') || identifier.startsWith('https://')) {
    return identifier;
  }

  // Otherwise, treat the identifier as a name to be formatted.
  const basePath = options?.basePath ?? '/assets/images';
  const ext = options?.ext ?? '.jpeg';
  const formattedName = identifier.toLowerCase().replace(/\s+/g, '_');

  return `${basePath}/${formattedName}${ext}`;
}

export const TrackArt: React.FC<TrackArtProps> = ({ imageUrl, playlistName }) => {
  // Use imageUrl directly if provided, otherwise generate one from playlistName.
  const src = imageUrl || (playlistName ? getImagePath(playlistName) : '');
  return (
    <div>
      {src ? <img src={src} className='track-art' alt="Track Art" /> : <div>No Image</div>}
    </div>
  );
};
