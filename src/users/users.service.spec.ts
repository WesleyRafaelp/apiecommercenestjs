import { HttpException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { UsersService } from "./users.service";

const user = new User();
user.iduser = 1;
user.email = 'root@gmail.com';
user.password = '12345';

describe('UsersService', () => {
    let usersService: UsersService;
  
    const mockUserRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }
    
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [UsersService, {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository
        }],
      }).compile();
  
      usersService = module.get<UsersService>(UsersService);
    });

    beforeEach(() => {
      mockUserRepository.create.mockReset();
      mockUserRepository.save.mockReset();
      mockUserRepository.find.mockReset();
      mockUserRepository.findOne.mockReset();
      mockUserRepository.update.mockReset();
      mockUserRepository.delete.mockReset();
    });
  
    it('should be defined', () => {
      expect(usersService).toBeDefined();
    });

    describe('findAll', () => {
      it('Should return array users', async () => {
        mockUserRepository.find.mockReturnValue([user, user]);

        const users = await usersService.findAll()
        
        expect(users).toHaveLength(2)
        expect(mockUserRepository.find).toHaveBeenCalledTimes(1)
      });
    });

    describe('findOne', () => {
      it('Should return one user', async () => {
        mockUserRepository.findOne.mockReturnValue(user);

        const oneUser = await usersService.findOne('root@gmail.com')
        
        expect(oneUser).toMatchObject(user);
        expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
      });

      it('Should not return one user', async () => {
        mockUserRepository.findOne.mockReturnValue(undefined);
        
        expect(usersService.findOne('admin@gmail.com')).rejects.toBeInstanceOf(HttpException);
        expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
      }); 
    });

    describe('create', () => {
      it('should create a new user record and return that', async () => {
        mockUserRepository.create.mockReturnValue(user);
        mockUserRepository.save.mockReturnValue(user);

        const createOrder = await usersService.create(user)
        
        expect(createOrder).toMatchObject(user);
        expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
        expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
      });

      it('User already registered!', async () => {
        mockUserRepository.findOne.mockReturnValue(user);

        expect(usersService.create(user)).rejects.toBeInstanceOf(HttpException);
        expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
      })
    });

    describe('remove', () => {
      it('Should delete a existing user', async () => {
        mockUserRepository.findOne.mockReturnValue(user);
        mockUserRepository.delete.mockReturnValue(null);

        const removeOrder = await usersService.remove(1);
        
        expect(removeOrder).toBe(null);
        expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
        expect(mockUserRepository.delete).toHaveBeenCalledTimes(1);
      });

      it('should not return one user', async () => {
        mockUserRepository.findOne.mockReturnValue(undefined);
        expect(usersService.remove(0)).rejects.toBeInstanceOf(HttpException);
        expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
      });
    }); 

  });
  