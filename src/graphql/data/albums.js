// @flow
import songs from './songs';
import { makeMap } from './utils';

type Source = {
  id: string,
  name: string,
  artworkUrl: string,
  artist: string,
  songs: string[],
  releaseYear: number,
};

const albums: Source[] = [
  {
    id: '0d9396f5-5454-47ce-9bd8-dacaf2fbf6d0',
    name: 'Stole the Show',
    artworkUrl:
      'https://i.scdn.co/image/d345ab2a8278434f1c8cc936ace70da02ac845fb',
    artist: 'b4976c45-3362-4e50-9274-63a375b3a299',
    songs: ['69120ac9-1e48-494f-a1f4-4a34735fe408'],
    releaseYear: 2015,
  },
  {
    id: '44db420c-0995-4a74-9cc2-0191d65bfdd0',
    name: "I'm That (Remix)",
    artist: 'c1e012c3-f496-41e9-aa67-a060b666bd78',
    songs: ['9283bed7-a183-4f54-a0d7-820946c220e3'],
    releaseYear: 2015,
    artworkUrl:
      'http://is4.mzstatic.com/image/thumb/Music5/v4/08/da/96/08da9619-3f9b-7c95-60d1-6c18cfdd4dbd/source/600x600bb.jpg',
  },
  {
    id: 'd0941f59-2138-433c-9ccf-368040228593',
    name: 'Bugatti',
    artworkUrl:
      'https://upload.wikimedia.org/wikipedia/en/3/3f/AceHood_Bugatti.jpg',
    artist: '79506046-e727-405b-924a-2daf428e772f',
    songs: ['492667ee-5bed-45ff-8a2c-67277677cf86'],
    releaseYear: 2013,
  },
  {
    id: 'fc1acc4a-8e76-493c-ae3b-e71a88d41bbf',
    name: 'The Beautiful & Damned',
    artworkUrl:
      'https://upload.wikimedia.org/wikipedia/en/3/31/G-Eazy_-_The_Beautiful_%26_Damned.png',
    artist: '04f6d289-154c-4602-9a33-e27d4be265d7',
    songs: [],
    releaseYear: 2017,
  },
];

export type Album = {
  duration: number,
} & Source;

const processedAlbums: Map<string, Album> = makeMap(
  albums.map((album: Source): Album => ({
    ...album,
    duration: album.songs
      .map(songKey => songs.get(songKey))
      .map(({ duration = 0 } = {}) => duration)
      .reduce((a, b) => a + b, 0),
  }))
);

export default processedAlbums;