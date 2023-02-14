import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriarProdutoDTO } from './dto/criarProduto.dto';
import { ProdutoRepository } from './produto.repository';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}

  @Post()
  async salvarProduto(@Body() produto: CriarProdutoDTO) {
    this.produtoRepository.salvar(produto);
    return { mensagem: 'Produto salvo!', produto };
  }

  @Get()
  async listarProdutos() {
    return this.produtoRepository.listar();
  }
}
