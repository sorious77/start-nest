import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getMovieById(id: string): Movie {
    return this.movies.find((movie) => movie.id === +id);
  }

  deleteMovie(id: string): boolean {
    this.movies.filter((movie) => movie.id !== +id);

    return true;
  }

  createMovie(movieData: Movie): boolean {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });

    return true;
  }
}
