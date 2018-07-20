import React from 'react';
import styles from './style.css';

interface Props {
  src: string;
  alt: string;
}

// A styled image for consistent album artwork.
const Artwork = ({ src, alt }: Props) => (
  <img draggable={false} className={styles.container} src={src} alt={alt} />
);

export default Artwork;