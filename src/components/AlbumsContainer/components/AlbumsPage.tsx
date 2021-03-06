import React from 'react';
import Observer from 'react-intersection-observer';

import Title from '../../Title';
import { AlbumInfo } from './AlbumInfo';
import { PositionedHeading } from '../../styled/PositionedHeading';
import { Container } from '../../Container';
import { ArtworkGridContents } from '../../styled/ArtworkGridContents';

import { AlbumsQuery_albums as Albums } from '../enhancers/__generated__/AlbumsQuery';

export interface Props {
  albums?: Albums;
  fetchMore: () => void;
}

export const AlbumsPage = ({ albums, fetchMore }: Props) => (
  <div>
    <Title segments={['Albums']} />

    <Container>
      <AlbumsHeading>Albums</AlbumsHeading>

      <ArtworkGridContents>
        {albums &&
          albums.edges.map(({ node }) => (
            <AlbumInfo key={node.id} album={node} />
          ))}
        <Observer
          key={'final'}
          onChange={inView => {
            if (!inView) {
              return;
            }

            fetchMore();
          }}
        >
          <div />
        </Observer>
      </ArtworkGridContents>
    </Container>
  </div>
);

const AlbumsHeading = PositionedHeading.extend`
  margin-bottom: 0;
`;
