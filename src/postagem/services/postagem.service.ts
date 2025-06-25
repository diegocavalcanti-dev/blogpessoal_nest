import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';
import { TemaService } from 'src/tema/services/tema.service';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
    private temaService: TemaService,
  ) {}

  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      relations: {
        tema: true,
      },
    });
  }

  // pesquisa por ID
  async findById(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({
      where: {
        id,
      },
      relations: {
        tema: true,
      },
    });
    // select * from tb_postagem where id = 1
    if (!postagem) {
      throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);
    }

    return postagem;
  }

  // pesquisa por Titulo
  async findAllByTitulo(titulo: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`),
      },
      relations: {
        tema: true,
      },
    });
  }

  // insert into tb_produtos(titulo, texto) values ('titulo que eu mandar', 'texto que eu mandar');
  async create(postagem: Postagem): Promise<Postagem> {
    await this.temaService.findById(postagem.tema.id);

    return await this.postagemRepository.save(postagem);
  }

  // atualizar postagens
  async update(postagem: Postagem): Promise<Postagem> {
    await this.findById(postagem.id);

    await this.temaService.findById(postagem.tema.id);

    return await this.postagemRepository.save(postagem);
  }

  // deletar postagem
  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.postagemRepository.delete(id);
  }
}
