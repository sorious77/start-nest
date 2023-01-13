import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getMovieById(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);

    if (!movie) {
      throw new NotFoundException(`Movie with Id(${id}) Not found`);
    }

    return movie;
  }

  deleteMovie(id: number): boolean {
    this.getMovieById(id); // Check Movie with Id exists in movies

    this.movies = this.movies.filter((movie) => movie.id !== +id);

    return true;
  }

  createMovie(movieData: CreateMovieDTO): boolean {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });

    return true;
  }

  patchMovie(id: number, movieData: UpdateMovieDTO) {
    const movie = this.getMovieById(id); // Check Movie with Id exists in movies

    this.deleteMovie(id);

    this.movies.push({ ...movie, ...movieData });

    return true;
  }
}
