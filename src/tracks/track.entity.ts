import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../artists/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { Expose, Transform } from 'class-transformer';
import { Album } from '../albums/album.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Expose({ name: 'artistId' })
  @Transform(({ value }) => value?.id || null)
  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: Artist | null;

  @ManyToOne(() => Album, (album) => album.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  album: Album | null;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;

  constructor(track: Partial<Track>) {
    Object.assign(this, track);
    this.id = uuidv4();
  }
}
