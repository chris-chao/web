import React from 'react';
import SongsInner from './components/Songs';
import { Result, SongsQuery } from './enhancers/query';
import { SongsContainerState } from './enhancers/state';
import { SortBy } from './enhancers/__generated__/SongsQuery';

export const Songs = () => (
  <SongsContainerState sortBy={SortBy.LEXICOGRAPHICALLY} isReverse={false}>
    {({ isReverse, setReverse, sortBy, setSortBy }) => (
      <SongsQuery variables={{ isReverse, sortBy }}>
        {(result: Result) => {
          if (!result.data || !result.data.songs) {
            return null;
          }

          return (
            <SongsInner
              songs={result.data.songs.edges.map(({ node }) => node)}
              isLoadingMore={result.loading}
              hasMore={result.data.songs.pageInfo.hasNextPage}
              loadMore={result.getNextPage}
              isReverse={isReverse}
              setReverse={setReverse}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          );
        }}
      </SongsQuery>
    )}
  </SongsContainerState>
);
