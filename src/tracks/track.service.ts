import { Injectable } from '@nestjs/common';
import { Track } from './track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(@InjectRepository(Track) private repository: Repository<Track>) {}

  getAllTracks(): Promise<Track[]> {
    return this.repository.find();
  }

  getTrackById(id: string): Promise<Track | null> {
    return this.repository.findOneBy({ id });
  }

  createTrack({
    name,
    duration,
    artistId,
    albumId,
  }: CreateTrackDto): Promise<Track> {
    const track = new Track({
      name,
      duration,
    });

    return this.repository.save(track);
  }

  updateTrack(
    track: Track,
    { name, duration, artistId, albumId }: UpdateTrackDto,
  ): Promise<Track> {
    track.name = name;
    track.duration = duration;
    // track.artistId = artistId;
    // track.albumId = albumId;

    return this.repository.save(track);
  }

  async deleteTrack({ id: trackId }: Track): Promise<boolean> {
    const deleteResult = await this.repository.delete({ id: trackId });

    return !!deleteResult.affected;
  }
}
