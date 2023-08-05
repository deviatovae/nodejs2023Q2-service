import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TrackModule } from './tracks/track.module';
import { ArtistModule } from './artists/artist.module';
import { AlbumModule } from './albums/album.module';
import { FavModule } from './favs/fav.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        synchronize: true,
        url: configService.get('DATABASE_DSN'),
        autoLoadEntities: true,
        database: 'postgres',
        schema: 'public',
      }),
    }),
    UsersModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavModule,
  ],
})
export class AppModule {}
