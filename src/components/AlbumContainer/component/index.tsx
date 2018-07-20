import React from 'react';
import styles from './styles.css';
import { AlbumQuery_album } from '../enhancers/__generated__/AlbumQuery';
import Title from '../../Title';
import { PlaybackAlbumArtwork } from '../../PlaybackAlbumArtwork';
import { Link } from 'react-router-dom';
import { artistPath } from '../../../utils/paths';
import { pluralize } from '../../../utils';
import { SongList } from '../../SongList';
import { formatDuration } from '../../../utils/duration';
import { AlbumRowHeader, AlbumRow } from '../../AlbumRow';

export interface Props {
  album: AlbumQuery_album;
  onDoubleClick: (startIndex: number) => void;
  currentlyPlayingId?: string;
}

export const Album = ({ album, onDoubleClick, currentlyPlayingId }: Props) => (
  <div>
    <Title segments={[album.name]} />

    <div className={styles.header}>
      <div className={styles.albumArtwork}>
        <PlaybackAlbumArtwork backgroundInteraction album={album} />
      </div>
      <div className={styles.headerRightColumn}>
        <div className={styles.albumName}>{album.name}</div>
        <div className={styles.artistName}>
          <Link className={styles.link} to={artistPath(album.artist.id)}>
            {album.artist.name}
          </Link>
        </div>

        <div className={styles.statsContainer}>
          {album.songs.length} {pluralize('song', album.songs.length)},{' '}
          {formatDuration(album.duration)}
        </div>
      </div>
    </div>

    <div className={styles.songContainer}>
      <SongList
        header={<AlbumRowHeader />}
        countAvailableRows={album.songs.length}
        renderItem={index => {
          const song = album.songs[index];

          return (
            <AlbumRow
              key={song.id}
              song={song}
              active={currentlyPlayingId === song.id}
              onDoubleClick={() => onDoubleClick(index)}
            />
          );
        }}
      />
    </div>
  </div>
);