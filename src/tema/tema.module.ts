import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tema } from './entities/tema.entity';
import { TemaService } from './services/tema.service';
import { TemaController } from './controllers/tema.controller';

@Module({
  // importação da modelagem de tema
  imports: [TypeOrmModule.forFeature([Tema])],
  // asd
  providers: [TemaService],
  controllers: [TemaController],
  exports: [TemaService],
})
export class TemaModule {}
