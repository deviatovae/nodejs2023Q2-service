import { Album } from '../../albums/album.model';
import { Artist } from '../../artists/artist.model';
import { Track } from '../../tracks/track.model';

export interface FavoritesResult {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
