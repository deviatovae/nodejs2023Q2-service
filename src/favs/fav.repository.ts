import { Favorites } from './fav.model';

export const FavRepositoryInterface = 'FavRepositoryInterface';

export interface FavRepository {
  getFavorites(): Favorites;
  addTrackToFav(id: string): boolean;
  addAlbumToFav(id: string): boolean;
  addArtistToFav(id: string): boolean;
  deleteTrackFromFav(id: string): boolean;
  deleteAlbumFromFav(id: string): boolean;
  deleteArtistFromFav(id: string): boolean;
}
