import React from 'react';
import gql from 'graphql-tag';

import {
  ConnectionQuery,
  ConnectionQueryProps,
  ConnectionQueryResult,
} from '../../ConnectionQuery';
import {
  SongsQuery as Data,
  SongsQueryVariables as Variables,
} from './__generated__/SongsQuery';
import { Omit } from '../../../utils';
import { fragment } from '../../SongListContainer/enhancers/query';

const query = gql`
  query SongsQuery($cursor: String, $isReverse: Boolean!, $sortBy: SortBy!) {
    songs(
      first: 1000
      after: $cursor
      sort: { reverse: $isReverse, sortBy: $sortBy }
    ) @connection {
      count
      pageInfo {
        hasNextPage
      }

      edges {
        cursor

        node {
          ...SongDetailFragment
        }
      }
    }
  }

  ${fragment}
`;

export type Result = ConnectionQueryResult<Data, Variables>;

export const SongsQuery = (
  props: Omit<ConnectionQueryProps<Data, Variables>, 'query'>
) => <ConnectionQuery query={query} children={props.children} {...props} />;
