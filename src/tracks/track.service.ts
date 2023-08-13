import { Injectable } from '@nestjs/common';
import { Track } from './track.model';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  getAllTracks(): Track[] {
    return this.tracks;
  }

  getTrackById(id: string): Track {
    return this.tracks.find((track) => track.id === id);
  }

  createTrack({ name, duration, artistId, albumId }: CreateTrackDto): Track {
    const track = {
      id: uuidv4(),
      name,
      artistId,
      albumId,
      duration,
    };

    this.tracks.push(track);
    return track;
  }

  updateTrack(
    track: Track,
    { name, duration, artistId, albumId }: UpdateTrackDto,
  ): Track {
    track.name = name;
    track.duration = duration;
    track.artistId = artistId;
    track.albumId = albumId;

    return track;
  }

  deleteTrack(track: Track): boolean {
    const trackIdx = this.tracks.findIndex((t) => track === t);

    if (trackIdx < 0) {
      return false;
    }

    this.tracks.splice(trackIdx, 1);

    return true;
  }
}
