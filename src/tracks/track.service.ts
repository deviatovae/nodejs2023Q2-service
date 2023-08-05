import { Injectable } from '@nestjs/common';
import { Track } from './track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../albums/album.entity';
import { Artist } from '../artists/artist.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track) private repository: Repository<Track>,
    @InjectRepository(Album) private albumRepository: Repository<Album>,
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {}

  getAllTracks(): Promise<Track[]> {
    return this.repository.find();
  }

  getTrackById(id: string): Promise<Track | null> {
    return this.repository.findOneBy({ id });
  }

  async createTrack({
    name,
    duration,
    artistId,
    albumId,
  }: CreateTrackDto): Promise<Track> {
    const track = new Track({
      name,
      duration,
    });

    if (artistId) {
      track.artist = await this.artistRepository.findOneBy({ id: artistId });
    }
    if (albumId) {
      track.album = await this.albumRepository.findOneBy({ id: albumId });
    }

    return this.repository.save(track);
  }

  async updateTrack(
    track: Track,
    { name, duration, artistId, albumId }: UpdateTrackDto,
  ): Promise<Track> {
    track.name = name;
    track.duration = duration;

    if (artistId) {
      track.artist = await this.artistRepository.findOneBy({ id: artistId });
    }
    if (albumId) {
      track.album = await this.albumRepository.findOneBy({ id: albumId });
    }

    return this.repository.save(track, { reload: true });
  }

  async deleteTrack({ id: trackId }: Track): Promise<boolean> {
    const deleteResult = await this.repository.delete({ id: trackId });

    return !!deleteResult.affected;
  }
}
