// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ApolloProvider } from 'react-apollo';
import { HashRouter } from 'react-router-dom';

import { songs } from '../graphql/mock';
import type { Song } from '../graphql/mock';
import SongList from '../components/SongList/SongList';
import { Header, Row } from '../components/SongList/Detail';
import styles from './SongList.css';
import { mustGet } from '../graphql/mock/utils';
import type {
  Song as SongDetail,
  SongRowProps,
} from '../components/SongList/Detail';
import client from '../graphql/client';
import ConnectedDetailRow from '../containers/SongList/Detail';

const ids = Array.from(songs.keys());
ids.sort();

type State = {
  isLoaded: boolean,
};

class DelayedLoadingRow extends Component<SongRowProps, State> {
  state = {
    isLoaded: false,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ isLoaded: true }), 1000);
  }

  render() {
    return <Row song={this.state.isLoaded ? this.props.song : undefined} />;
  }
}

const Story = ({
  count = ids.length,
  getId = index => ids[index],
  getRowForSong = (song, index) => (
    <Row song={song} onDoubleClick={action(`clicked ${index}`)} />
  ),
}: {
  count?: number,
  getId?: number => string,
  getRowForSong?: (SongDetail, number) => Node,
}) => (
  // loadMore is never called if count is Infinity.
  <SongList
    rootClassName={styles.root}
    className={styles.list}
    loadMore={() => {}}
    header={<Header />}
    totalItems={count}
    count={Infinity}
    renderItem={({ index, style }) => {
      const id = getId(index);
      const song: Song = mustGet(songs, id);

      return (
        <div style={style} key={index}>
          {getRowForSong(song, index)}
        </div>
      );
    }}
  />
);

storiesOf('SongList', module)
  .addDecorator(story => <HashRouter>{story()}</HashRouter>)
  .add('a few items', () => <Story />)
  .add('single row loading', () => <Row />)
  .add('the same items many times', () => (
    <Story count={1000} getId={index => ids[index % ids.length]} />
  ))
  .add('lots of loading items', () => (
    <Story
      count={1000}
      getId={index => ids[index % ids.length]}
      getRowForSong={song => <DelayedLoadingRow song={song} />}
    />
  ))
  .add('an active row', () => (
    <Row
      song={mustGet(songs, 'song:1:1')}
      active={true}
      onDoubleClick={action('double click')}
    />
  ))
  .add('connected detail row', () => (
    <ApolloProvider client={client}>
      <ConnectedDetailRow songId={'69120ac9-1e48-494f-a1f4-4a34735fe408'} />
    </ApolloProvider>
  ));
