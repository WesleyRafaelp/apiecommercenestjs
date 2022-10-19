import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { sign } from 'crypto';
import { NotAcceptableException } from '@nestjs/common';

const user = new User();
user.iduser = 1;
user.email = 'root@gmail.com';
user.password = bcrypt.hashSync('12345', 8);

describe('AuthService', () => {
  let authService: AuthService;

  const mockAuth = {
    findOne: jest.fn(),
    sign:jest.fn(),
    validateUsuario:jest.fn()
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService, {
        provide: getRepositoryToken(User),
        useValue: mockAuth
      },
    ]
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  beforeEach(() => {
    mockAuth.findOne.mockReset();
    mockAuth.sign.mockReset();
    mockAuth.validateUsuario.mockReset();
    jest.resetAllMocks();
  })

  describe('validateUsuario', () => {
    it('Validated user', async () => {
      mockAuth.findOne.mockReturnValue(user);
    
      const result = {
        email: user.email,
        iduser: user.iduser  
      }
      const validate = await authService.validateUsuario(user.email, '12345');
      
      expect(validate).toMatchObject(result)
      expect(mockAuth.findOne).toHaveBeenCalledTimes(1)
    });

    it('User not validated', async () => {
      mockAuth.findOne.mockReturnValue(user);

      const validate = await authService.validateUsuario(user.email, '123456');
      
      expect(validate).toBe(null)
      expect(mockAuth.findOne).toHaveBeenCalledTimes(1)
    });
  });

  describe('login', () => {
    it('Authenticated user', async () => {
      const result = {
        email: user.email,
        iduser: user.iduser,   
      }
      //mockAuth.findOne.mockReturnValue(user)
      // mockAuth.validateUsuario.mockReturnValue(result);
      jest.spyOn(authService, 'validateUsuario').mockImplementation(async () => result);
      const login = await authService.login({username: user.email, password:'12345'});
      
      expect(login).toBeTruthy()
      //expect(mockAuth.validateUsuario).toHaveBeenCalledTimes(1)
      //expect(mockAuth.sign).toHaveBeenCalledTimes(1)
      //expect(mockAuth.findOne).toHaveBeenCalledTimes(1)
    });

    describe('', ()=>{
      it('Unauthenticated user', async () => {
      
        const auth = jest.spyOn(authService, 'validateUsuario').mockImplementation(async () => null);
        //mockAuth.validateUsuario.mockReturnValue(result);
        //const login = await authService.login({username: user.email, password:'123456'});
        
        expect(authService.login({username: user.email, password:'123456'})).rejects.toBeInstanceOf(NotAcceptableException);
        //expect(auth).toHaveBeenCalledTimes(1)
        //expect(mockAuth.sign).toHaveBeenCalledTimes(1)
      });
    })
    
  });
  
});
