import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TrackModule } from './tracks/track.module';
import { ArtistModule } from './artists/artist.module';
import { AlbumModule } from './albums/album.module';

@Module({
  imports: [UsersModule, TrackModule, ArtistModule, AlbumModule],
})
export class AppModule {}
