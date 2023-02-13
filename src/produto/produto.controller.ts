import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}

  @Post()
  async salvarProduto(@Body() produto) {
    this.produtoRepository.salvar(produto);
    return { mensagem: 'Produto salvo!', produto };
  }

  @Get()
  async listarProdutos() {
    return this.produtoRepository.listar();
  }
}
