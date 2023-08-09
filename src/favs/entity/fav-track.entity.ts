import { Fav } from './fav.entity';
import { ChildEntity, JoinColumn, OneToOne } from 'typeorm';
import { Track } from '../../tracks/track.entity';

@ChildEntity()
export class FavTrack extends Fav {
  @OneToOne(() => Track, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'track_id' })
  track: Track;

  constructor(track: Track) {
    super();
    this.track = track;
  }
}
