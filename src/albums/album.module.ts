import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from '../tracks/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Artist } from '../artists/artist.entity';

@Module({
  imports: [TrackModule, TypeOrmModule.forFeature([Album, Artist])],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
