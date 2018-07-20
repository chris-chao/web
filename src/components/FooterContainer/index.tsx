import React from 'react';

import Footer from './component';
import { FooterQuery } from './enhancers/query';
import { LikeMutation } from './enhancers/likeMutation';
import { PlaySongMutation } from './enhancers/playSongMutation';
import { Kind, QueueItem } from '../../redux/state/queue';
import { FooterState } from './enhancers/redux';

export interface InputProps {
  className: string;
}

const getIdForSourceKind = (
  kind: Kind,
  queueItem: QueueItem
): string | undefined =>
  queueItem.source && queueItem.source.kind === kind
    ? queueItem.source.list
    : undefined;

const EnhancedFooter = ({ className }: InputProps) => (
  <FooterState>
    {({ queueItem, nextSong, previousSong, play, pause, playing }) => (
      <FooterQuery
        variables={queueItem && { songId: queueItem.songId }}
        skip={!queueItem}
      >
        {queryResults => (
          <LikeMutation variables={queueItem && { songId: queueItem.songId }}>
            {likeCurrentSong => (
              <PlaySongMutation
                variables={
                  queueItem && {
                    songId: queueItem.songId,
                    albumId: getIdForSourceKind('ALBUM', queueItem),
                    artistId: getIdForSourceKind('ARTIST', queueItem),
                  }
                }
              >
                {playCurrentSong => (
                  <Footer
                    nowPlaying={queryResults.data && queryResults.data.song}
                    className={className}
                    onToggleLike={() => likeCurrentSong()}
                    playSong={() => playCurrentSong()}
                    nextSong={nextSong}
                    previousSong={previousSong}
                    play={play}
                    pause={pause}
                    playing={playing}
                  />
                )}
              </PlaySongMutation>
            )}
          </LikeMutation>
        )}
      </FooterQuery>
    )}
  </FooterState>
);

export default EnhancedFooter;