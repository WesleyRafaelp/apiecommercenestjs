import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

describe('AppControllers (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {

    const mockAuthGuard = { CanActivate: jest.fn(() => true)}

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideGuard(JwtAuthGuard)
    .useValue(mockAuthGuard)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    return await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('UsersController (e2e)', () => {
    describe('/users (POST)', () => {
      it('Create user'), () => {

      }
    })

    describe('/users/login (POST)', () => {
      it('user Authorizate', () => {

      })

      it('user  not Authorizate', () => {
        
      })
    })

    describe('/users (GET)', () => {
      it('Array user', () => {

      })

      it('error', () => {
        
      })
    })

    describe('/users/{id} (DELETE)', () => {
      it('Delete user', () => {

      })

      it('error', () => {
        
      })
    })
  })

  describe('ProductsControllers (e2e)', () => {
    describe('/products (GET)', () => {
      it('/products (GET)', () => {
        return request(app.getHttpServer())
          .get('/products')
          .expect(200)
          .expect(Array)  
      });
  
      it('/products/{id} (GET)', () => {
        return request(app.getHttpServer())
          .get('/products/1')
          .expect(200)
          .expect(Object)  
      });
    })
  })
  
  describe('OrdersController (e2e)', () => {
    describe('/orders (POST)', () => {
      it('Create order'), () => {

      }
    })

    describe('/orders (GET)', () => {
      it('order Authorizate', () => {

      })

      it('order  not Authorizate', () => {
        
      })
    })

    describe('/orders/{id} (GET)', () => {
      it('Array order', () => {

      })

      it('error', () => {
        
      })
    })

    describe('/orders/{id} (DELETE)', () => {
      it('Delete order', () => {

      })

      it('error', () => {
        
      })
    })
  })

});
