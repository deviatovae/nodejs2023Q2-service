import { FavRepository } from './fav.repository';
import { Favorites } from './fav.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FavMemoryRepository implements FavRepository {
  private favorites: {
    artists: string[];
    albums: string[];
    tracks: string[];
  } = { artists: [], albums: [], tracks: [] };

  getFavorites(): Favorites {
    return this.favorites;
  }

  addTrackToFav(id: string): boolean {
    this.favorites.tracks.push(id);
    return true;
  }

  addAlbumToFav(id: string): boolean {
    this.favorites.albums.push(id);
    return true;
  }

  addArtistToFav(id: string): boolean {
    this.favorites.artists.push(id);
    return true;
  }

  deleteTrackFromFav(id: string): boolean {
    const idx = this.favorites.tracks.findIndex((trackId) => trackId === id);
    if (idx < 0) {
      return false;
    }
    this.favorites.tracks.splice(idx, 1);
    return true;
  }

  deleteAlbumFromFav(id: string): boolean {
    const idx = this.favorites.albums.findIndex((albumId) => albumId === id);
    if (idx < 0) {
      return false;
    }
    this.favorites.albums.splice(idx, 1);
    return true;
  }

  deleteArtistFromFav(id: string): boolean {
    const idx = this.favorites.artists.findIndex((artistId) => artistId === id);
    if (idx < 0) {
      return false;
    }
    this.favorites.artists.splice(idx, 1);
    return true;
  }
}
