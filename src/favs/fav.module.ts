import { Module } from '@nestjs/common';
import { FavService } from './fav.service';
import { FavController } from './fav.controller';
import { TrackModule } from '../tracks/track.module';
import { AlbumModule } from '../albums/album.module';
import { ArtistModule } from '../artists/artist.module';
import { FavRepositoryInterface } from './fav.repository';
import { FavDbRepository } from './fav-db.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fav } from './entity/fav.entity';
import { FavArtist } from './entity/fav-artist.entity';
import { FavAlbum } from './entity/fav-album.entity';
import { FavTrack } from './entity/fav-track.entity';

@Module({
  imports: [
    TrackModule,
    AlbumModule,
    ArtistModule,
    TypeOrmModule.forFeature([Fav, FavArtist, FavAlbum, FavTrack]),
  ],
  controllers: [FavController],
  providers: [
    FavService,
    {
      provide: FavRepositoryInterface,
      useClass: FavDbRepository,
    },
  ],
})
export class FavModule {
}
