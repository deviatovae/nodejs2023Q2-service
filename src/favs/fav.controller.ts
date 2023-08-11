import {
  BadRequestException,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
  UseInterceptors,
} from '@nestjs/common';
import { FavService } from './fav.service';
import { FavoritesResult } from './dto/fav-result.dto';
import { isUUID } from 'class-validator';

@Controller('/favs')
@UseInterceptors(ClassSerializerInterceptor)
export class FavController {
  constructor(private readonly favService: FavService) {}

  @Get()
  getFavorites(): Promise<FavoritesResult> {
    return this.favService.getFavorites();
  }

  @Post('track/:id')
  @HttpCode(201)
  async addTrackToFav(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid id format');
    }
    if (!(await this.favService.addTrackToFavorites(id))) {
      throw new UnprocessableEntityException();
    }
  }

  @Post('album/:id')
  @HttpCode(201)
  async addAlbumToFav(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid id format');
    }
    if (!(await this.favService.addAlbumToFavorites(id))) {
      throw new UnprocessableEntityException();
    }
  }

  @Post('artist/:id')
  @HttpCode(201)
  async addArtistToFav(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid id format');
    }
    if (!(await this.favService.addArtistToFavorites(id))) {
      throw new UnprocessableEntityException();
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrackToFav(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid id format');
    }
    if (!(await this.favService.deleteTrackFromFavorites(id))) {
      throw new NotFoundException();
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbumToFav(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid id format');
    }
    if (!(await this.favService.deleteAlbumFromFavorites(id))) {
      throw new NotFoundException();
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtistToFav(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid id format');
    }
    if (!(await this.favService.deleteArtistFromFavorites(id))) {
      throw new NotFoundException();
    }
  }
}
