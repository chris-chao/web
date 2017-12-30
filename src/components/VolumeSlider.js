import React from 'react';
import type { ComponentType } from 'react';

import Slider from './Slider';
import { Loud, Quiet, Cone } from '../icons/Volume';

import {
  container as containerClass,
  icon as iconClass,
  slider as sliderClass,
  bar as barClass,
  input as inputClass,
} from './VolumeSlider.css';

type Props = {
  // Number between 0 and 1 representing the volume.
  volume: number,

  // Called when the volume changes.
  onVolume: number => void,
};

function getIconComponent(volume: number): ComponentType<{ svgClass: string }> {
  if (volume < 0.15) {
    return Cone;
  } else if (volume < 0.75) {
    return Quiet;
  } else {
    return Loud;
  }
}

const VolumeIcon = ({ volume, ...props }: { volume: number }) => {
  const Icon = getIconComponent(volume);
  return <Icon {...props} />;
};

// A slider which a range of [0, 1] and a speaker icons.
const VolumeSlider = ({ volume, onVolume }: Props) => (
  <div className={containerClass}>
    <VolumeIcon svgClass={iconClass} volume={volume} />

    <Slider
      containerClass={sliderClass}
      barClass={barClass}
      inputClass={inputClass}
      min={0}
      max={100}
      value={volume * 100}
      onValueChange={volume => onVolume(volume / 100)}
    />
  </div>
);

export default VolumeSlider;