import React from 'react';
import styles from './Detail.css';
import { formatDuration } from '../../utils/duration';
import { Artist, InlineArtistsList } from '../InlineArtistsList';
import { AlbumLink, Album } from '../AlbumLink';

// Header and row element for the detailed song list which is used in queue,
// playlist, etc..

export const Header = () => (
  <div className={styles.header}>
    <div className={styles.song}>Name</div>
    <div className={styles.album}>Album</div>
    <div className={styles.artist}>Artists</div>
    <div className={styles.duration}>Duration</div>
  </div>
);

interface Song {
  name: string;
  duration: number;
  album: Album;
  artists: Artist[];
}

export interface SongRowProps {
  // When this is undefined, the component is in a loading state.
  song?: Song;

  // Whether or not the current item should be styled as if it is active.
  // Defaults to false.
  active: boolean;

  // Called when the component is double clicked.
  onDoubleClick?: () => void;
}

export const Row = ({ song, active, onDoubleClick }: SongRowProps) => (
  <div
    className={[
      styles.row,
      !song ? styles.empty : '',
      active ? styles.active : '',
    ].join(' ')}
    onDoubleClick={onDoubleClick}
  >
    <div className={styles.song}>{song && song.name}</div>
    <div className={styles.album}>
      {song && <AlbumLink album={song.album} />}
    </div>

    <div className={styles.artist}>
      {song && <InlineArtistsList artists={song.artists} />}
    </div>
    <div className={styles.duration}>
      {song && <span>{formatDuration(song.duration)}</span>}
    </div>
  </div>
);
