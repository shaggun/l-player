import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<IconButton onClick={() => {}} iconPath="/assets/play.svg" ariaLabel="Play" />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('triggers onClick when clicked', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<IconButton onClick={onClick} iconPath="/assets/play.svg" ariaLabel="Play" />);
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
