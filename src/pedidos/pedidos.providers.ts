import { DataSource } from 'typeorm';
import { Pedido } from './pedidos.entity';

export const pedidoProviders = [
  {
    provide: 'PEDIDO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Pedido),
    inject: ['DATA_SOURCE'],
  },
];