import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private repository: Repository<Album>,
  ) {}

  getAllAlbums(): Promise<Album[]> {
    return this.repository.find();
  }

  getAlbumById(id: string): Promise<Album | null> {
    return this.repository.findOneBy({ id });
  }

  createAlbum(dto: CreateAlbumDto): Promise<Album> {
    const album = new Album(dto);
    return this.repository.save(album);
  }

  updateAlbum(
    album: Album,
    { name, year, artistId }: UpdateAlbumDto,
  ): Promise<Album> {
    album.name = name;
    album.year = year;

    return this.repository.save(album);
  }

  async deleteAlbum({ id: albumId }: Album): Promise<boolean> {
    const deleteResult = await this.repository.delete({ id: albumId });

    return !!deleteResult.affected;
  }
}
