import { CaracteristicaProdutoEntity } from "./caracteristicaProduto.entity";
import { ImagemProdutoEntity } from "./imagemProduto.entity";

export class ProdutoEntity {
    id: string;
    usuarioId: string;
    nome: string;
    valor: number;
    quantidadeDisponivel: number;
    descricao: string;
    caracteristicas: CaracteristicaProdutoEntity[];
    imagens: ImagemProdutoEntity[];
    categoria: string;
}