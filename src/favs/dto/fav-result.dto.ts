import { Album } from '../../albums/album.entity';
import { Artist } from '../../artists/artist.entity';
import { Track } from '../../tracks/track.entity';

export interface FavoritesResult {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
