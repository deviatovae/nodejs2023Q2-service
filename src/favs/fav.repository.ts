import { Fav } from './entity/fav.entity';
import { FavArtist } from './entity/fav-artist.entity';
import { FavAlbum } from './entity/fav-album.entity';
import { FavTrack } from './entity/fav-track.entity';
import { Album } from '../albums/album.entity';
import { Track } from '../tracks/track.entity';
import { Artist } from '../artists/artist.entity';

export const FavRepositoryInterface = 'FavRepositoryInterface';

export interface FavRepository {
  getFavorites(): Promise<Fav[]>;

  addTrackToFav(track: FavTrack): Promise<FavTrack>;

  addAlbumToFav(album: FavAlbum): Promise<FavAlbum>;

  addArtistToFav(artist: FavArtist): Promise<FavArtist>;

  deleteTrackFromFav(track: FavTrack): Promise<boolean>;

  deleteAlbumFromFav(album: FavAlbum): Promise<boolean>;

  deleteArtistFromFav(artist: FavArtist): Promise<boolean>;

  getFavByAlbum(album: Album): Promise<FavAlbum | null>;

  getFavByTrack(track: Track): Promise<FavTrack | null>;

  getFavByArtist(artist: Artist): Promise<FavArtist | null>;
}
