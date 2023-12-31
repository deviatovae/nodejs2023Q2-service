import { Inject, Injectable } from '@nestjs/common';
import { FavRepository, FavRepositoryInterface } from './fav.repository';
import { FavoritesResult } from './dto/fav-result.dto';
import { ArtistService } from '../artists/artist.service';
import { TrackService } from '../tracks/track.service';
import { AlbumService } from '../albums/album.service';
import { FavArtist } from './entity/fav-artist.entity';
import { FavAlbum } from './entity/fav-album.entity';
import { FavTrack } from './entity/fav-track.entity';

@Injectable()
export class FavService {
  constructor(
    @Inject(FavRepositoryInterface) private readonly repository: FavRepository,
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  async getFavorites(): Promise<FavoritesResult> {
    const favs = await this.repository.getFavorites();

    return {
      albums: favs
        .filter((fav) => fav instanceof FavAlbum)
        .map((fav: FavAlbum) => fav.album),
      tracks: favs
        .filter((fav) => fav instanceof FavTrack)
        .map((fav: FavTrack) => fav.track),
      artists: favs
        .filter((fav) => fav instanceof FavArtist)
        .map((fav: FavArtist) => fav.artist),
    };
  }

  async addTrackToFavorites(id: string): Promise<boolean> {
    const track = await this.trackService.getTrackById(id);

    if (!track) {
      return false;
    }

    return !!(await this.repository.addTrackToFav(new FavTrack(track)));
  }

  async addAlbumToFavorites(id: string): Promise<boolean> {
    const album = await this.albumService.getAlbumById(id);

    if (!album) {
      return false;
    }

    return !!(await this.repository.addAlbumToFav(new FavAlbum(album)));
  }

  async addArtistToFavorites(id: string): Promise<boolean> {
    const artist = await this.artistService.getArtistById(id);

    if (!artist) {
      return false;
    }

    return !!(await this.repository.addArtistToFav(new FavArtist(artist)));
  }

  async deleteTrackFromFavorites(id: string): Promise<boolean> {
    const track = await this.trackService.getTrackById(id);
    if (!track) {
      return false;
    }
    const fav = await this.repository.getFavByTrack(track);
    if (!fav) {
      return false;
    }

    return await this.repository.deleteTrackFromFav(fav);
  }

  async deleteAlbumFromFavorites(id: string): Promise<boolean> {
    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      return false;
    }
    const fav = await this.repository.getFavByAlbum(album);
    if (!fav) {
      return false;
    }
    return await this.repository.deleteAlbumFromFav(fav);
  }

  async deleteArtistFromFavorites(id: string): Promise<boolean> {
    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      return false;
    }
    const fav = await this.repository.getFavByArtist(artist);
    if (!fav) {
      return false;
    }
    return await this.repository.deleteArtistFromFav(fav);
  }
}
