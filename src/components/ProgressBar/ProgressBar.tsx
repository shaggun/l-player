import React, { Fragment } from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentTime, duration, onSeek }) => {
  const percentage = (currentTime / duration) * 100;
  const backgroundStyle = `linear-gradient(to right, white 0%, white ${percentage}%, gray ${percentage}%, gray 100%)`;

  // Format time for display
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Fragment>
      <span className='time-label'>{formatTime(currentTime)}</span>
      <input
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime}
        onChange={onSeek}
        style={{ background: backgroundStyle }}
      />
      <span className='time-label'>-{formatTime(duration - currentTime)}</span>
    </Fragment>
  );
};
