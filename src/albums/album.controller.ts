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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { isUUID } from 'class-validator';
import { Album } from './album.model';
import { TrackService } from '../tracks/track.service';

@Controller('')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  @Get('/album')
  getAllAlbums(): Album[] {
    return this.albumService.getAllAlbums();
  }

  @Post('/album')
  @HttpCode(201)
  createAlbum(@Body() dto: CreateAlbumDto): Album {
    if (!dto.name || !dto.year) {
      throw new BadRequestException('Invalid dto format');
    }
    return this.albumService.createAlbum(dto);
  }

  @Get('/album/:id')
  async getAlbumById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid albumId format');
    }

    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  @Put('/album/:id')
  async updateAlbum(@Param('id') id: string, @Body() dto: UpdateAlbumDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid albumId format');
    }

    if (!id) {
      throw new NotFoundException();
    }

    if (!dto.name || !dto.year) {
      throw new BadRequestException('Invalid dto format');
    }

    const album = await this.albumService.getAlbumById(id);

    if (!album) {
      throw new NotFoundException();
    }

    this.albumService.updateAlbum(album, dto);

    return album;
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid albumId format');
    }

    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException();
    }

    if (!this.albumService.deleteAlbum(album)) {
      throw new InternalServerErrorException();
    }

    const tracks = this.trackService.getAllTracks();
    tracks.forEach((track) => {
      if (track.albumId === id) {
        const updTrack = { ...track, albumId: null };
        this.trackService.updateTrack(track, updTrack);
      }
    });
  }
}
