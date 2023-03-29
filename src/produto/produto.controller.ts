import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CaracteristicaProdutoEntity } from './caracteristicaProduto.entity';
import { AtualizarProdutoDTO } from './dto/atualizarProduto.dto';
import { CaracteristicaProdutoDTO } from './dto/caracteristicaProduto.dto';
import { CriarProdutoDTO } from './dto/criarProduto.dto';
import { ImagemProdutoDTO } from './dto/imagemProduto.dto';
import { ListarProdutoDTO } from './dto/listarProduto.dto';
import { ImagemProdutoEntity } from './imagemProduto.entity';
import { ProdutoEntity } from './produto.entity';
import { ProdutoRepository } from './produto.repository';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}

  @Post()
  async salvarProduto(@Body() dadosProduto: CriarProdutoDTO) {
    const produtoEntity = new ProdutoEntity();
    produtoEntity.usuarioId = dadosProduto.usuarioId;
    produtoEntity.nome = dadosProduto.nome;
    produtoEntity.valor = dadosProduto.valor;
    produtoEntity.quantidadeDisponivel = dadosProduto.quantidadeDisponivel;
    produtoEntity.descricao = dadosProduto.descricao;
    produtoEntity.categoria = dadosProduto.categoria;
    produtoEntity.caracteristicas = dadosProduto.caracteristicas.map((c) => {
      const caracteristicaProdutoEntity = new CaracteristicaProdutoEntity();
      caracteristicaProdutoEntity.nome = c.nome;
      caracteristicaProdutoEntity.descricao = c.descricao;

      return caracteristicaProdutoEntity;
    });
    produtoEntity.imagens = dadosProduto.imagens.map((i) => {
      const imagemProdutoEntity = new ImagemProdutoEntity();
      imagemProdutoEntity.url = i.url;
      imagemProdutoEntity.descricao = i.descricao;

      return imagemProdutoEntity;
    });

    const produto = await this.produtoRepository.salvar(produtoEntity);

    return this.criarListarProdutoDTO(produto);
  }

  @Get()
  async listarProdutos() {
    const produtos = await this.produtoRepository.listar();

    return produtos.map((p) => this.criarListarProdutoDTO(p));
  }

  @Put('/:id')
  async atualizarProduto(
    @Param('id') id: string,
    @Body() dadosProduto: AtualizarProdutoDTO,
  ) {
    const produtoAtualizado = await this.produtoRepository.atualizar(
      id,
      dadosProduto,
    );

    if (produtoAtualizado) {
      return this.criarListarProdutoDTO(produtoAtualizado);
    } else {
      throw new NotFoundException('Produto não encontrado');
    }
  }

  @Delete('/:id')
  async removerProduto(@Param('id') id: string) {
    const produtoRemovido = await this.produtoRepository.remover(id);

    if (produtoRemovido) {
      return this.criarListarProdutoDTO(produtoRemovido);
    } else {
      throw new NotFoundException('Produto não encontrado');
    }
  }

  private criarListarProdutoDTO(prduto: ProdutoEntity) {
    return new ListarProdutoDTO(
      prduto.id,
      prduto.usuarioId,
      prduto.nome,
      prduto.valor,
      prduto.quantidadeDisponivel,
      prduto.descricao,
      prduto.categoria,
      prduto.caracteristicas.map((c) => {
        const caracteristicaProdutoDTO = new CaracteristicaProdutoDTO();
        caracteristicaProdutoDTO.nome = c.nome;
        caracteristicaProdutoDTO.descricao = c.descricao;

        return caracteristicaProdutoDTO;
      }),
      prduto.imagens.map((i) => {
        const imagemProdutoDTO = new ImagemProdutoDTO();
        imagemProdutoDTO.url = i.url;
        imagemProdutoDTO.descricao = i.descricao;

        return imagemProdutoDTO;
      }),
    );
  }
}
