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
  getMovieById(@Param('id') id: string): Movie {
    return this.moviesService.getMovieById(id);
  }

  @Post()
  createMovie(@Body() movieData): boolean {
    return this.moviesService.createMovie(movieData);
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string): boolean {
    return this.moviesService.deleteMovie(id);
  }

  @Patch(':id')
  patchMovie(@Param('id') id: string, @Body() movieData) {
    return {
      updatedMovie: id,
      movieData,
    };
  }
}
