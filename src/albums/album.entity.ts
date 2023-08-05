import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../artists/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { Expose, Transform } from 'class-transformer';
import { Track } from '../tracks/track.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Expose({ name: 'artistId' })
  @Transform(({ value }) => value?.id || null)
  @ManyToOne(() => Artist, (artist) => artist.albums, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: Artist | null;

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];

  constructor(album: Partial<Album>) {
    Object.assign(this, album);
    this.id = uuidv4();
  }
}
