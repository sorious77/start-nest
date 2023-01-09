import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'Movies!';
  }

  @Get('/:id')
  getMovieById(@Param('id') id: string) {
    return `Movie By ${id}`;
  }

  @Post()
  createMovie() {
    return 'Create Movie';
  }

  @Delete('/:id')
  deleteMovie(@Param('id') id: string) {
    return `Delete Movie ${id}`;
  }

  @Patch('/:id')
  patchMovie(@Param('id') id: string) {
    return `Patch Movie ${id}`;
  }
}
