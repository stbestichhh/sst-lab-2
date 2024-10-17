import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
    service.init(['users', 'categories', 'records']);
  });

  afterAll(() => {
    service.drop();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create new entities', () => {
      expect(() => {
        service.create('users', {
          id: 1,
          data: { name: 'User1' },
        });

        service.create('users', {
          id: 2,
          data: { name: 'User2' },
        });

        service.create('categories', {
          id: 1,
          data: { name: 'category1' },
        });
      }).not.toThrow();
    });

    it('should throw if user already exists', () => {
      expect(() => {
        service.create('users', {
          id: 1,
          data: { name: 'User1' },
        });
      }).toThrow();
    });
  });

  describe('get', () => {
    it('should get all categories', () => {
      expect(service.getAll('categories')).toStrictEqual([
        { id: 1, data: { name: 'category1' } },
      ]);
    });

    it('should get all users', () => {
      expect(service.getAll('users')).toStrictEqual([
        {
          id: 1,
          data: { name: 'User1' },
        },
        {
          id: 2,
          data: { name: 'User2' },
        },
      ]);
    });

    it('should get user by id', () => {
      expect(service.get('users', 1)).toStrictEqual({
        id: 1,
        data: { name: 'User1' },
      });
    });
  });

  describe('update', () => {
    it('should change user by id', () => {
      service.update('users', 1, { name: 'Updated user' });
      expect(service.get('users', 1)).toStrictEqual({
        id: 1,
        data: { name: 'Updated user' },
      });
    });
  });

  describe('delete', () => {
    it('should delete user', () => {
      service.delete('users', 1);
      expect(service.getAll('users')).toHaveLength(1);
    });
  });
});
