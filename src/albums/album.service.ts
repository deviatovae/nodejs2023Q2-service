import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './album.model';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  getAllAlbums(): Album[] {
    return this.albums;
  }

  getAlbumById(id: string): Album {
    return this.albums.find((album) => album.id === id);
  }

  createAlbum(dto: CreateAlbumDto): Album {
    const album = {
      id: uuidv4(),
      ...dto,
    };

    this.albums.push(album);
    return album;
  }

  updateAlbum(album: Album, { name, year, artistId }: UpdateAlbumDto): Album {
    album.name = name;
    album.year = year;
    album.artistId = artistId;

    return album;
  }

  deleteAlbum(album: Album): boolean {
    const albumIdx = this.albums.findIndex((t) => album === t);

    if (albumIdx < 0) {
      return false;
    }

    this.albums.splice(albumIdx, 1);

    return true;
  }
}
