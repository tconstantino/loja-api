import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { CaracteristicaProdutoDTO } from './caracteristicaProduto.dt';
import { ImagemProdutoDTO } from './imagemProduto.dto';

export class CriarProdutoDTO {
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  nome: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Valor não poder ter mais que 2 casas decimais' },
  )
  @IsPositive({ message: 'Valor deve ser maior que zero' })
  valor: number;

  @Min(0, { message: 'Quatidade Disponível não pode ser menor que zero' })
  quantidadeDisponivel: number;

  @IsNotEmpty({ message: 'Descrição não pode ser vazia' })
  @MaxLength(1000, {
    message: 'Descrição não poder ter mais que 1000 caracteres',
  })
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3, { message: 'Características precisa de pelo menos 3 itens' })
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1, { message: 'Imagens precisa de pelo menos 1 item' })
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @IsNotEmpty({ message: 'Categoria não pode ser vazia' })
  categoria: string;
}
