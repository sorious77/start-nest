import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getMovieById(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);

    if (!movie) {
      throw new NotFoundException(`Movie with Id(${id}) Not found`);
    }

    return movie;
  }

  deleteMovie(id: string): boolean {
    this.getMovieById(id); // Check Movie with Id exists in movies

    this.movies = this.movies.filter((movie) => movie.id !== +id);

    return true;
  }

  createMovie(movieData: Movie): boolean {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });

    return true;
  }

  patchMovie(id: string, movieData) {
    const movie = this.getMovieById(id); // Check Movie with Id exists in movies

    this.deleteMovie(id);

    this.movies.push({ ...movie, ...movieData });

    return true;
  }
}
