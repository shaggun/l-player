import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { VolumeSlider } from './VolumeSlider';

describe('VolumeSlider', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<VolumeSlider value={0.5} onChange={() => {}} />);
    expect(getByRole('slider')).toBeInTheDocument();
  });

  it('calls onChange when volume is adjusted', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<VolumeSlider value={0.5} onChange={onChange} />);
    fireEvent.change(getByRole('slider'), { target: { value: 0.8 } });
    expect(onChange).toHaveBeenCalled();
  });
});
