import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getMovieById()', () => {
    it('should return a movie', () => {
      service.createMovie({
        title: 'test',
        genres: ['test'],
        year: 2023,
      });
      const movie = service.getMovieById(1);

      expect(movie).toBeDefined();
      expect(movie.title).toEqual('test');
    });

    it('should throw 404 error', () => {
      try {
        service.getMovieById(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with Id(999) Not found');
      }
    });
  });
});
