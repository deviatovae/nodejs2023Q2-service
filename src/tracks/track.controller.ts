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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { isUUID } from 'class-validator';
import { Track } from './track.model';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get('/track')
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Post('/track')
  @HttpCode(201)
  createTrack(@Body() dto: CreateTrackDto): Track {
    if (!dto.name || !dto.duration) {
      throw new BadRequestException('Invalid dto format');
    }
    return this.trackService.createTrack(dto);
  }

  @Get('/track/:id')
  async getTrackById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid trackId format');
    }

    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  @Put('/track/:id')
  async updateTrack(@Param('id') id: string, @Body() dto: UpdateTrackDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid trackId format');
    }

    if (!id) {
      throw new NotFoundException();
    }

    if (!dto.name || !dto.duration) {
      throw new BadRequestException('Invalid dto format');
    }

    const track = await this.trackService.getTrackById(id);

    if (!track) {
      throw new NotFoundException();
    }

    this.trackService.updateTrack(track, dto);

    return track;
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid trackId format');
    }

    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new NotFoundException();
    }

    if (!this.trackService.deleteTrack(track)) {
      throw new InternalServerErrorException();
    }
  }
}
