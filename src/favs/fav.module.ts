import { Module } from '@nestjs/common';
import { FavService } from './fav.service';
import { FavController } from './fav.controller';
import { TrackModule } from '../tracks/track.module';
import { AlbumModule } from '../albums/album.module';
import { ArtistModule } from '../artists/artist.module';
import { FavMemoryRepository } from './fav-memory.repository';
import { FavRepositoryInterface } from './fav.repository';

@Module({
  imports: [TrackModule, AlbumModule, ArtistModule],
  controllers: [FavController],
  providers: [
    FavService,
    {
      provide: FavRepositoryInterface,
      useClass: FavMemoryRepository,
    },
  ],
})
export class FavModule {}
