import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist) private repository: Repository<Artist>,
  ) {}

  getAllArtists(): Promise<Artist[]> {
    return this.repository.find();
  }

  getArtistById(id: string): Promise<Artist> {
    return this.repository.findOneBy({ id });
  }

  createArtist(dto: CreateArtistDto): Promise<Artist> {
    const artist = {
      id: uuidv4(),
      ...dto,
    };

    return this.repository.save(artist);
  }

  updateArtist(
    artist: Artist,
    { name, grammy }: UpdateArtistDto,
  ): Promise<Artist> {
    artist.name = name;
    artist.grammy = grammy;

    return this.repository.save(artist);
  }

  async deleteArtist(artist: Artist): Promise<boolean> {
    const deleteResult = await this.repository.delete({ id: artist.id });

    return !!deleteResult.affected;
  }
}
