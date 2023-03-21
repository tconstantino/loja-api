import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { UsuarioExistente } from 'src/usuario/validacao/usuarioExistente.validator';
import { CaracteristicaProdutoDTO } from './caracteristicaProduto.dto';
import { ImagemProdutoDTO } from './imagemProduto.dto';

export class AtualizarProdutoDTO {
  @IsUUID(undefined, { message: 'Id de usuário inválido' })
  @UsuarioExistente({ message: 'Id de usuário não existe' })
  @IsOptional()
  usuarioId: string;

  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @IsOptional()
  nome: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Valor não poder ter mais que 2 casas decimais' },
  )
  @IsPositive({ message: 'Valor deve ser maior que zero' })
  @IsOptional()
  valor: number;

  @Min(0, { message: 'Quatidade Disponível não pode ser menor que zero' })
  @IsOptional()
  quantidadeDisponivel: number;

  @IsNotEmpty({ message: 'Descrição não pode ser vazia' })
  @MaxLength(1000, {
    message: 'Descrição não poder ter mais que 1000 caracteres',
  })
  @IsOptional()
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3, { message: 'Características precisa de pelo menos 3 itens' })
  @Type(() => CaracteristicaProdutoDTO)
  @IsOptional()
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1, { message: 'Imagens precisa de pelo menos 1 item' })
  @Type(() => ImagemProdutoDTO)
  @IsOptional()
  imagens: ImagemProdutoDTO[];

  @IsNotEmpty({ message: 'Categoria não pode ser vazia' })
  @IsOptional()
  categoria: string;
}
