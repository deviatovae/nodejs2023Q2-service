import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../artists/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { Expose, Transform } from 'class-transformer';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Expose({ name: 'artistId' })
  @Transform(({ value }) => value?.id || null)
  @ManyToOne(() => Artist, (artist) => artist.tracks, { nullable: true })
  artist: Artist | null;

  @Column()
  duration: number;

  constructor(track: Partial<Track>) {
    Object.assign(this, track);
    this.id = uuidv4();
  }
}
