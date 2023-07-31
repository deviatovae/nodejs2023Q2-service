import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { isBoolean, isUUID } from 'class-validator';
import { Artist } from './artist.model';
import { TrackService } from '../tracks/track.service';
import { AlbumService } from '../albums/album.service';

@Controller('')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  @Get('/artist')
  getAllArtists(): Artist[] {
    return this.artistService.getAllArtists();
  }

  @Post('/artist')
  @HttpCode(201)
  createArtist(@Body() dto: CreateArtistDto): Artist {
    if (!dto.name || !isBoolean(dto.grammy)) {
      throw new BadRequestException('Invalid dto format');
    }
    return this.artistService.createArtist(dto);
  }

  @Get('/artist/:id')
  async getArtistById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid artistId format');
    }

    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  @Put('/artist/:id')
  async updateArtist(@Param('id') id: string, @Body() dto: UpdateArtistDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid artistId format');
    }

    if (!id) {
      throw new NotFoundException();
    }

    if (!dto.name || !isBoolean(dto.grammy)) {
      throw new BadRequestException('Invalid dto format');
    }

    const artist = await this.artistService.getArtistById(id);

    if (!artist) {
      throw new NotFoundException();
    }

    this.artistService.updateArtist(artist, dto);

    return artist;
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid artistId format');
    }

    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException();
    }

    if (!this.artistService.deleteArtist(artist)) {
      throw new InternalServerErrorException();
    }

    const tracks = this.trackService.getAllTracks();
    tracks.forEach((track) => {
      if (track.artistId === id) {
        const updTrack = { ...track, artistId: null };
        this.trackService.updateTrack(track, updTrack);
      }
    });

    const albums = this.albumService.getAllAlbums();
    albums.forEach((album) => {
      if (album.artistId === id) {
        const updAlbum = { ...album, artistId: null };
        this.albumService.updateAlbum(album, updAlbum);
      }
    });
  }
}
