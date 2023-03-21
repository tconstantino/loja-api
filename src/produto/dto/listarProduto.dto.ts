import { CaracteristicaProdutoDTO } from "./caracteristicaProduto.dto";
import { ImagemProdutoDTO } from "./imagemProduto.dto";

export class ListarProdutoDTO {
    constructor(
        readonly id: string,
        readonly usuarioId: string,
        readonly nome: string,
        readonly valor: number,
        readonly quantidadeDisponivel: number,
        readonly descricao: string,
        readonly categoria: string,
        readonly caracteristicas: CaracteristicaProdutoDTO[],
        readonly imagens: ImagemProdutoDTO[]
    ) {}
}