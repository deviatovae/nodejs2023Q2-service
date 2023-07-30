import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './artist.model';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  getAllArtists(): Artist[] {
    return this.artists;
  }

  getArtistById(id: string): Artist {
    return this.artists.find((artist) => artist.id === id);
  }

  createArtist(dto: CreateArtistDto): Artist {
    const artist = {
      id: uuidv4(),
      ...dto,
    };

    this.artists.push(artist);
    return artist;
  }

  updateArtist(artist: Artist, { name, grammy }: UpdateArtistDto): Artist {
    artist.name = name;
    artist.grammy = grammy;

    return artist;
  }

  deleteArtist(artist: Artist): boolean {
    const artistIdx = this.artists.findIndex((t) => artist === t);

    if (artistIdx < 0) {
      return false;
    }

    this.artists.splice(artistIdx, 1);

    return true;
  }
}
