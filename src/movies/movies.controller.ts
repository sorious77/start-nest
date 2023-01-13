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

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'Movies!';
  }

  @Get('search')
  searchMovie(@Query('year') year: string) {
    return `search movie by year : ${year}`;
  }

  @Get(':id')
  getMovieById(@Param('id') id: string) {
    return `Movie By ${id}`;
  }

  @Post()
  createMovie(@Body() movieData) {
    console.log(movieData);

    return movieData;
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    return `Delete Movie ${id}`;
  }

  @Patch(':id')
  patchMovie(@Param('id') id: string, @Body() movieData) {
    return {
      updatedMovie: id,
      movieData,
    };
  }
}
