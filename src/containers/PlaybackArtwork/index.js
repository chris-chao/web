// @flow
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Node } from 'react';

import type { Kind, QueueItemSource } from '../../state/queue';
import type { State } from '../../state';
import type { PlaybackState } from '../../components/PlaybackArtwork';
import { play, pause } from '../../actions';
import {
  isSource,
  nowPlaying as nowPlayingSelector,
} from '../../selectors/nowPlaying';
import PlaybackArtwork from '../../components/PlaybackArtwork';
import { playList } from '../../actions/creators/queue';

type Props = {|
  // The kind of list this is. Used to check whether the current playing
  // item is from this list. This information also passed to onStartPlayback.
  kind: Kind,

  // The id of this list. Used to check whether the current playing item is
  // from this list. This information is also passed to onStartPlayback.
  list: string,

  // A list of tracks to enqueue when play is pressed.
  tracks: QueueItemSource[],

  // See components/PlaybackArtwork.js.
  backgroundInteraction?: boolean,
  children: Node,
|};

type ReduxStateEnhancedProps = {
  state: PlaybackState,
};

type ReduxActionEnhancedProps = {
  onPlaying: () => void,
  onPaused: () => void,
};

const reduxEnhancer = connect(
  ({ queue }: State, { kind, list }: Props): ReduxStateEnhancedProps => {
    const { source = {} } = nowPlayingSelector(queue) || {};

    const nowPlaying = isSource(source, kind, list);

    return {
      state: nowPlaying
        ? queue.shouldBePlaying ? 'PLAYING' : 'PAUSED'
        : 'STOPPED',
    };
  },
  (dispatch, { tracks, list, kind }: Props): ReduxActionEnhancedProps => ({
    onPlaying: () => dispatch(play()),
    onPaused: () => dispatch(pause()),
    onStartPlayback: async () => {
      const itemsWithDefaults: QueueItemSource[] = tracks.map(item => ({
        ...item,
        source: { list, kind, ...item.source },
      }));

      playList(dispatch)(itemsWithDefaults);
    },
  })
);

const enhancers = compose(reduxEnhancer);

// A connected playback artwork. It updates its state based on the current
// playing item and calls a prop when time to play more items.
const EnhancedComponent = enhancers(PlaybackArtwork);

export default EnhancedComponent;
