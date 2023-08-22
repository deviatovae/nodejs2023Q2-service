import { FavRepository } from './fav.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fav } from './entity/fav.entity';
import { Injectable } from '@nestjs/common';
import { Album } from '../albums/album.entity';
import { Artist } from '../artists/artist.entity';
import { Track } from '../tracks/track.entity';
import { FavArtist } from './entity/fav-artist.entity';
import { FavAlbum } from './entity/fav-album.entity';
import { FavTrack } from './entity/fav-track.entity';

@Injectable()
export class FavDbRepository implements FavRepository {
  constructor(
    @InjectRepository(Fav)
    private readonly fav: Repository<Fav>,
    @InjectRepository(FavArtist)
    private readonly favArtistRepo: Repository<FavArtist>,
    @InjectRepository(FavAlbum)
    private readonly favAlbumRepo: Repository<FavAlbum>,
    @InjectRepository(FavTrack)
    private readonly favTrackRepo: Repository<FavTrack>,
  ) {}

  addAlbumToFav(album: FavAlbum): Promise<FavAlbum> {
    return this.favAlbumRepo.save(album);
  }

  addArtistToFav(artist: FavArtist): Promise<FavArtist> {
    return this.favArtistRepo.save(artist);
  }

  addTrackToFav(track: FavTrack): Promise<FavTrack> {
    return this.favTrackRepo.save(track);
  }

  async deleteAlbumFromFav(album: FavAlbum): Promise<boolean> {
    const deleteResult = await this.favAlbumRepo.delete({ id: album.id });

    return !!deleteResult.affected;
  }

  async deleteArtistFromFav(artist: FavArtist): Promise<boolean> {
    const deleteResult = await this.favArtistRepo.delete({ id: artist.id });

    return !!deleteResult.affected;
  }

  async deleteTrackFromFav(track: FavTrack): Promise<boolean> {
    const deleteResult = await this.favTrackRepo.delete({ id: track.id });

    return !!deleteResult.affected;
  }

  getFavorites() {
    return this.fav.find();
  }

  getFavByAlbum(album: Album): Promise<FavAlbum | null> {
    return this.favAlbumRepo.findOneBy({ album });
  }

  getFavByArtist(artist: Artist): Promise<FavArtist | null> {
    return this.favArtistRepo.findOneBy({ artist });
  }

  getFavByTrack(track: Track): Promise<FavTrack | null> {
    return this.favTrackRepo.findOneBy({ track });
  }
}
