import { Inject, Injectable } from '@nestjs/common';
import { FavRepository, FavRepositoryInterface } from './fav.repository';
import { FavoritesResult } from './dto/fav-result.dto';
import { ArtistService } from '../artists/artist.service';
import { TrackService } from '../tracks/track.service';
import { AlbumService } from '../albums/album.service';

@Injectable()
export class FavService {
  constructor(
    @Inject(FavRepositoryInterface) private readonly repository: FavRepository,
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  getFavorites(): FavoritesResult {
    const favs = this.repository.getFavorites();

    return {
      albums: [],
      tracks: [],
      artists: [],
    };
  }

  addTrackToFavorites(id: string): boolean {
    const track = this.trackService.getTrackById(id);

    if (!track) {
      return false;
    }

    this.repository.addTrackToFav(id);

    return true;
  }

  addAlbumToFavorites(id: string): boolean {
    const album = this.albumService.getAlbumById(id);

    if (!album) {
      return false;
    }

    this.repository.addAlbumToFav(id);

    return true;
  }

  addArtistToFavorites(id: string): boolean {
    const artist = this.artistService.getArtistById(id);

    if (!artist) {
      return false;
    }

    this.repository.addArtistToFav(id);

    return true;
  }

  deleteTrackToFavorites(id: string): boolean {
    const track = this.trackService.getTrackById(id);
    if (!track) {
      return false;
    }
    return this.repository.deleteTrackFromFav(id);
  }

  deleteAlbumToFavorites(id: string): boolean {
    const track = this.albumService.getAlbumById(id);
    if (!track) {
      return false;
    }
    return this.repository.deleteAlbumFromFav(id);
  }

  deleteArtistToFavorites(id: string): boolean {
    const track = this.artistService.getArtistById(id);
    if (!track) {
      return false;
    }
    return this.repository.deleteArtistFromFav(id);
  }
}
