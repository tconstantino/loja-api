import { IsNotEmpty } from 'class-validator';

export class CaracteristicaProdutoDTO {
  @IsNotEmpty({ message: 'Nome da característica não pode ser vazio' })
  nome: string;

  @IsNotEmpty({ message: 'Descrição da característica não pode ser vazia' })
  descricao: string;
}
