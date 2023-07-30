import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavService } from './fav.service';
import { FavoritesResult } from './dto/fav-result.dto';
import { isUUID } from 'class-validator';

@Controller('/favs')
export class FavController {
  constructor(private readonly favService: FavService) {}

  @Get()
  getFavorites(): FavoritesResult {
    return this.favService.getFavorites();
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrackToFav(@Param('id') id: string): void {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid id format');
    }
    if (!this.favService.addTrackToFavorites(id)) {
      throw new UnprocessableEntityException();
    }
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbumToFav(@Param('id') id: string): void {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid id format');
    }
    if (!this.favService.addAlbumToFavorites(id)) {
      throw new UnprocessableEntityException();
    }
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtistToFav(@Param('id') id: string): void {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid id format');
    }
    if (!this.favService.addArtistToFavorites(id)) {
      throw new UnprocessableEntityException();
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrackToFav(@Param('id') id: string): void {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid id format');
    }
    if (!this.favService.deleteTrackToFavorites(id)) {
      throw new NotFoundException();
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbumToFav(@Param('id') id: string): void {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid id format');
    }
    if (!this.favService.deleteAlbumToFavorites(id)) {
      throw new NotFoundException();
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtistToFav(@Param('id') id: string): void {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid id format');
    }
    if (!this.favService.deleteArtistToFavorites(id)) {
      throw new NotFoundException();
    }
  }
}
