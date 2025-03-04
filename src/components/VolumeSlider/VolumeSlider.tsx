import React from 'react';
import { IconButton } from '../IconButton/IconButton';

interface VolumeSliderProps {
  value: number;
  onChange: (newValue: number) => void;
}

export const VolumeSlider: React.FC<VolumeSliderProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const percentage = value * 100;

  const backgroundStyle = `linear-gradient(to right, white 0%, white ${percentage}%, gray ${percentage}%, gray 100%)`;

  return (
    <div className='volume-slider'>
      <IconButton
        iconPath={value === 0 ? "assets/icons/volume_off.svg" : "assets/icons/volume_on.svg"}
        ariaLabel="Volume Icon"
        width={20}
        height={20}
        onClick={() => null}
      />
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={handleChange}
        aria-label="Volume Slider"
        style={{ background: backgroundStyle }}
      />
    </div>

  );
};
