import React from 'react';

interface Track {
  name: string;
  duration: number;
  url: string;
}

interface TrackListProps {
  tracks: Track[];
  currentTrackIndex: number;
  onTrackSelect: (index: number) => void;
}

function formatTime(timeInSeconds: number) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export const TrackList: React.FC<TrackListProps> = ({
  tracks,
  currentTrackIndex,
  onTrackSelect,
}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => (
            <tr
              key={track.name}
              onClick={() => onTrackSelect(index)}
              role='button'
              aria-label={`Select track: ${track.name}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onTrackSelect(index);
                }
              }}
              style={{
                backgroundColor: index === currentTrackIndex ? '#1A1B1C' : 'transparent',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = index === currentTrackIndex ? '#1A1B1C' : '#232329'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index === currentTrackIndex ? '#1A1B1C' : 'transparent'}
            >
              <td className='track-number'>{index + 1}</td>
              <td >{track.name}</td>
              <td >{formatTime(track.duration)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
