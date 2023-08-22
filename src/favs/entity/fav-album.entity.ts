import { Fav } from './fav.entity';
import { ChildEntity, JoinColumn, OneToOne } from 'typeorm';
import { Album } from '../../albums/album.entity';

@ChildEntity()
export class FavAlbum extends Fav {
  @OneToOne(() => Album, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'album_id' })
  album: Album;

  constructor(album: Album) {
    super();
    this.album = album;
  }
}
