import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { after } from 'node:test';
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

  describe('deleteMovie()', () => {
    it('delete a movie', () => {
      service.createMovie({
        title: 'test',
        genres: ['test'],
        year: 2023,
      });

      const beforeDelete = service.getAll().length;
      const result = service.deleteMovie(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toEqual(beforeDelete - 1);
      expect(result).toEqual(true);
    });

    it('should throw 404 error', () => {
      try {
        service.deleteMovie(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with Id(999) Not found');
      }
    });
  });

  describe('createMovie()', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;

      service.createMovie({
        title: 'test',
        genres: ['test'],
        year: 2023,
      });

      const afterCreate = service.getAll().length;

      expect(afterCreate).toEqual(beforeCreate + 1);
    });
  });

  describe('patchMovie()', () => {
    it('should update a movie', () => {
      service.createMovie({
        title: 'test',
        genres: ['test'],
        year: 2023,
      });

      service.patchMovie(1, { title: 'test123' });

      const movie = service.getMovieById(1);

      expect(movie.title).toEqual('test123');
    });

    it('should throw 404 error', () => {
      try {
        service.patchMovie(999, { title: 'test123' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with Id(999) Not found');
      }
    });
  });
});
