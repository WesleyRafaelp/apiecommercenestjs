import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosController } from './produtos/produtos.controller';
import { PedidosController } from './pedidos/pedidos.controller';
import { ProdutosService } from './produtos/produtos.service';
import { PedidosService } from './pedidos/pedidos.service';
import { ProdutosModule } from './produtos/produtos.module';
import { DataSource } from 'typeorm';
import { PedidosModule } from './pedidos/pedidos.module';
import { UsuariosController } from './usuarios/usuarios.controller';
import { UsuariosModule } from './usuarios/usuarios.module';
import { UsuariosService } from './usuarios/usuarios.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { databaseProviders } from './database/database.providers';
import { pedidoProviders } from './pedidos/pedidos.providers';
import { produtoProviders } from './produtos/produtos.providers';
import { usuarioProviders } from './usuarios/usuarios.providers';

@Module({
  imports: [
    ProdutosModule,
    PedidosModule,
    UsuariosModule,
    AuthModule,
  ],
  controllers: [AppController, ProdutosController, PedidosController, UsuariosController],
  providers: [AppService, ProdutosService, PedidosService, UsuariosService, AuthService, ...databaseProviders, ...pedidoProviders, ...produtoProviders, ...usuarioProviders],
})
export class AppModule {}
