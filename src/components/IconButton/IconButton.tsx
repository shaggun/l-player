import React from 'react';

interface IconButtonProps {
  onClick: () => void;
  iconPath: string; // The path to the SVG file
  width?: number;
  height?: number;
  ariaLabel?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  iconPath,
  width = 40,
  height = 40,
  ariaLabel = 'Icon button',
}) => {
  return (
    <button
      className='icon-button'
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <img
        src={iconPath}
        alt={ariaLabel}
        width={width}
        height={height}
      />
    </button>
  );
};
