import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';
import { Bcrypt } from 'src/auth/bcrypt/bcrypt';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), forwardRef(() => AuthModule)],
  providers: [UsuarioService, Bcrypt],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule {}
