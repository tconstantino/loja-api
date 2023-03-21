import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ProdutoEntity } from './produto.entity';

@Injectable()
export class ProdutoRepository {
  private produtos: ProdutoEntity[] = [];

  async salvar(produto: ProdutoEntity) {
    produto.id = randomUUID();
    this.produtos.push(produto);
    return produto;
  }

  async listar() {
    return this.produtos;
  }

  async obterPeloId(id: string) {
    return this.produtos.find((p) => p.id === id);
  }

  async atualizar(id: string, dadosProduto: Partial<ProdutoEntity>) {
    const produto = await this.obterPeloId(id);

    if (produto) {
      delete dadosProduto.id;

      Object.entries(dadosProduto).forEach(([chave, valor]) => {
        produto[chave] = valor;
      });
    }

    return produto;
  }

  async remover(id: string) {
    const produto = await this.obterPeloId(id);

    if(produto) {
      const indice = this.produtos.indexOf(produto);
      this.produtos.splice(indice, 1);
    }

    return produto;
  }
}
