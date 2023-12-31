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
import { Artist } from './artist.entity';

@Controller('')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get('/artist')
  getAllArtists(): Promise<Artist[]> {
    return this.artistService.getAllArtists();
  }

  @Post('/artist')
  @HttpCode(201)
  createArtist(@Body() dto: CreateArtistDto): Promise<Artist> {
    if (!dto.name || !isBoolean(dto.grammy)) {
      throw new BadRequestException('Invalid dto format');
    }
    return this.artistService.createArtist(dto);
  }

  @Get('/artist/:id')
  async getArtistById(@Param('id') id: string): Promise<Artist> {
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
  async updateArtist(
    @Param('id') id: string,
    @Body() dto: UpdateArtistDto,
  ): Promise<Artist> {
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

    return this.artistService.updateArtist(artist, dto);
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

    if (!(await this.artistService.deleteArtist(artist))) {
      throw new InternalServerErrorException();
    }
  }
}
