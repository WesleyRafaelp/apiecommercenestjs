import { HttpException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getCustomRepositoryToken, getRepositoryToken } from "@nestjs/typeorm";
import { rejects } from "assert";
import { Order } from "./orders.entity";
import { OrdersService } from "./orders.service";

const order = new Order() 
    order.idorders= 1;
    order.product = {
      idproduct: 1, 
      name: 'vassoura', 
      price:5
    };
    order.quantity= 10;



describe('OrdersService', () => {
    let ordersService: OrdersService;

    const mockOrderRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }
  
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [OrdersService, {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository
        }],
      }).compile();
  
      ordersService = module.get<OrdersService>(OrdersService);
    });
  
    beforeEach(() => {
      mockOrderRepository.create.mockReset();
      mockOrderRepository.save.mockReset();
      mockOrderRepository.find.mockReset();
      mockOrderRepository.findOne.mockReset();
      mockOrderRepository.update.mockReset();
      mockOrderRepository.delete.mockReset();
    });

    it('should be defined', () => {
      expect(ordersService).toBeDefined();
    });

    describe('findAll', () => {
      it('Should return array orders', async () => {
        mockOrderRepository.find.mockReturnValue([order, order]);

        const orders = await ordersService.findAll()
        
        expect(orders).toHaveLength(2)
        expect(mockOrderRepository.find).toHaveBeenCalledTimes(1)
      });
    });

    describe('findOne', () => {
      it('Should return one order', async () => {
        mockOrderRepository.findOne.mockReturnValue(order);

        const oneOrder = await ordersService.findOne(1)
        
        expect(oneOrder).toMatchObject({product: order.product});
        expect(mockOrderRepository.findOne).toHaveBeenCalledTimes(1);
      });

      it('Should not return one order', async () => {
        mockOrderRepository.findOne.mockReturnValue(undefined);
        
        expect(ordersService.findOne(0)).rejects.toBeInstanceOf(HttpException);
        expect(mockOrderRepository.findOne).toHaveBeenCalledTimes(1);
      }); 
    });

    describe('create', () => {
      it('should create a new order record and return that', async () => {
        mockOrderRepository.create.mockReturnValue(order);
        mockOrderRepository.save.mockReturnValue(order);

        const createOrder = await ordersService.create(order)
        
        expect(createOrder).toMatchObject(order);
        expect(mockOrderRepository.create).toHaveBeenCalledTimes(1);
        expect(mockOrderRepository.save).toHaveBeenCalledTimes(1);
      });
    });

    describe('remove', () => {
      it('Should delete a existing order', async () => {
        mockOrderRepository.findOne.mockReturnValue(order);
        mockOrderRepository.delete.mockReturnValue(null);

        const removeOrder = await ordersService.remove(1);
        
        expect(removeOrder).toBe(null);
        expect(mockOrderRepository.findOne).toHaveBeenCalledTimes(1);
        expect(mockOrderRepository.delete).toHaveBeenCalledTimes(1);
      });

      it('should not return one order', async () => {
        mockOrderRepository.findOne.mockReturnValue(undefined);
        expect(ordersService.remove(0)).rejects.toBeInstanceOf(HttpException);
        expect(mockOrderRepository.findOne).toHaveBeenCalledTimes(1);
      });
    }); 
  });
  