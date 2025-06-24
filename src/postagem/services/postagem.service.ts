import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
  ) {}

  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find();
  }

  // pesquisa por ID
  async findById(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({
      where: {
        id,
      },
    });
    // select * from tb_postagem where id = 1
    if (!postagem) {
      throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);
    }

    return postagem;
  }

  // pesquisa por Titulo
  async findByTitulo(titulo: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`),
      },
    });
  }

  // insert into tb_produtos(titulo, texto) values ('titulo que eu mandar', 'texto que eu mandar');
  async create(postagem: Postagem): Promise<Postagem> {
    return await this.postagemRepository.save(postagem);
  }

  // atualizar postagens
  async update(postagem: Postagem): Promise<Postagem> {
    const buscaPostagem: Postagem = await this.findById(postagem.id);

    if (!buscaPostagem || !postagem.id)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    return await this.postagemRepository.save(postagem);
  }

  // deletar postagem
  async delete(id: number): Promise<DeleteResult> {
    const buscaPostagem = await this.findById(id);

    if (!buscaPostagem)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    return await this.postagemRepository.delete(id);
  }
}
