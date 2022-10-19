import { HttpException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { ProductsService } from "./products.service";

const product =  new Product();
  product.idproduct= 1;
  product.name= 'vassoura';
  product.price= 5;

describe('ProductsService', () => {
    let productsService: ProductsService;

    const mockProductRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
  
  
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [ProductsService, {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        }],
      }).compile();
  
      productsService = module.get<ProductsService>(ProductsService);
    });

    beforeEach(() => {
      mockProductRepository.create.mockReset();
      mockProductRepository.save.mockReset();
      mockProductRepository.find.mockReset();
      mockProductRepository.findOne.mockReset();
      mockProductRepository.update.mockReset();
      mockProductRepository.delete.mockReset();
    });
  
    it('Should be defined', () => {
      expect(productsService).toBeDefined();
    });

    describe('findAll', () => {
      it('Should return array products', async () => {
        mockProductRepository.find.mockReturnValue([product, product]);

        const products = await productsService.findAll()
        
        expect(products).toHaveLength(2)
        expect(mockProductRepository.find).toHaveBeenCalledTimes(1)
      });
    });

    describe('findOne', () => {
      it('Should return one product', async () => {
        mockProductRepository.findOne.mockReturnValue(product);

        const oneProduct = await productsService.findOne(1)
        
        expect(oneProduct).toMatchObject({name: product.name})
        expect(mockProductRepository.findOne).toHaveBeenCalledTimes(1)
      });

      it('Should not return one product', async () => {
        mockProductRepository.findOne.mockReturnValue(undefined); 
        
        expect(productsService.findOne(0)).rejects.toBeInstanceOf(HttpException)
        expect(mockProductRepository.findOne).toHaveBeenCalledTimes(1)
      });
    });

    describe('create', () => {
      it('Should create a new product record and return that', async () => {
        mockProductRepository.save.mockReturnValue(product);

        const createProduct = await productsService.create(product);
        
        expect(createProduct).toMatchObject({name: product.name})
        expect(mockProductRepository.save).toHaveBeenCalledTimes(1)
      });

      it('Product already registered!', async () => {
        mockProductRepository.findOne.mockReturnValue(product.name); 
        
        expect(productsService.create(product)).rejects.toBeInstanceOf(HttpException)
        expect(mockProductRepository.findOne).toHaveBeenCalledTimes(1)
      });
    });

    describe('update', () => {
      it('Update one product', async () => {
        mockProductRepository.findOne.mockReturnValue(product.idproduct); 
        mockProductRepository.update.mockReturnValue({...product, name: 'nome atualizado'});

        const updateProduct = await productsService.update(1, {...product, name: 'nome atualizado'});
        
        expect(updateProduct).toMatchObject({name: 'nome atualizado'})
        expect(mockProductRepository.update).toHaveBeenCalledTimes(1)
        expect(mockProductRepository.findOne).toHaveBeenCalledTimes(1)

      });

      it('Should not return one product', async () => {
        mockProductRepository.findOne.mockReturnValue(undefined); 
        
        expect(productsService.update(0, product)).rejects.toBeInstanceOf(HttpException);
        expect(mockProductRepository.findOne).toHaveBeenCalledTimes(1);
      });
    });

    describe('remove', () => {
      it('Should create a new order record and return that', async () => {
        mockProductRepository.findOne.mockReturnValue(product.idproduct); 
        mockProductRepository.delete.mockReturnValue(null);

        const deleteProduct = await productsService.remove(1);
        
        expect(deleteProduct).toBe(null);
        expect(mockProductRepository.delete).toHaveBeenCalledTimes(1);
        expect(mockProductRepository.findOne).toHaveBeenCalledTimes(1);
      });

      it('Should not return one product', async () => {
        mockProductRepository.findOne.mockReturnValue(undefined); 
        
        expect(productsService.remove(0)).rejects.toBeInstanceOf(HttpException)
        expect(mockProductRepository.findOne).toHaveBeenCalledTimes(1)
      });
    });
  });
  