import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('search')
  searchMovie(@Query('year') year: string) {
    return `search movie by year : ${year}`;
  }

  @Get(':id')
  getMovieById(@Param('id') id: number): Movie {
    return this.moviesService.getMovieById(id);
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDTO): boolean {
    return this.moviesService.createMovie(movieData);
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: number): boolean {
    return this.moviesService.deleteMovie(id);
  }

  @Patch(':id')
  patchMovie(@Param('id') id: number, @Body() movieData) {
    return this.moviesService.patchMovie(id, movieData);
  }
}
