import { Fav } from './fav.entity';
import { ChildEntity, JoinColumn, OneToOne } from 'typeorm';
import { Artist } from '../../artists/artist.entity';

@ChildEntity()
export class FavArtist extends Fav {
  @OneToOne(() => Artist, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;

  constructor(artist: Artist) {
    super();
    this.artist = artist;
  }
}
