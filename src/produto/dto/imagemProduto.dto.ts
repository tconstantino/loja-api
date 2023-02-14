import { IsNotEmpty, IsUrl } from 'class-validator';

export class ImagemProdutoDTO {
  @IsUrl(undefined, { message: 'Url da imagem é inválida' })
  url: string;

  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  descricao: string;
}
