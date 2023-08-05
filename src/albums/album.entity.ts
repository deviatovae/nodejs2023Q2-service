import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../artists/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { Expose, Transform } from 'class-transformer';

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
  @ManyToOne(() => Artist, (artist) => artist.albums, { nullable: true })
  artist: Artist | null;

  constructor(album: Partial<Album>) {
    Object.assign(this, album);
    this.id = uuidv4();
  }
}
