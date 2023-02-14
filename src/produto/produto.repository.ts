import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CriarProdutoDTO } from './dto/criarProduto.dto';

@Injectable()
export class ProdutoRepository {
  private produtos = [];

  async salvar(produto: CriarProdutoDTO) {
    const novoProduto = { id: randomUUID(), ...produto };
    this.produtos.push(novoProduto);
    return novoProduto;
  }

  async listar() {
    return this.produtos;
  }
}
