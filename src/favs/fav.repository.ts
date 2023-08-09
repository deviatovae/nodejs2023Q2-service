import { Fav } from './entity/fav.entity';
import { Album } from '../albums/album.entity';
import { Artist } from '../artists/artist.entity';
import { Track } from '../tracks/track.entity';
import { FavArtist } from './entity/fav-artist.entity';
import { FavAlbum } from './entity/fav-album.entity';
import { FavTrack } from './entity/fav-track.entity';

export const FavRepositoryInterface = 'FavRepositoryInterface';

export interface FavRepository {
  getFavorites(): Promise<Fav[]>;

  addTrackToFav(track: FavTrack): Promise<FavTrack>;

  addAlbumToFav(album: FavAlbum): Promise<FavAlbum>;

  addArtistToFav(artist: FavArtist): Promise<FavArtist>;

  deleteTrackFromFav(track: Track): boolean;

  deleteAlbumFromFav(album: Album): boolean;

  deleteArtistFromFav(artist: Artist): boolean;
}
