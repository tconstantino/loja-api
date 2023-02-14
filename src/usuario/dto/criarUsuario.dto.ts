import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailUnico } from '../validacao/emailUnico.validator';

export class CriarUsuarioDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @EmailUnico({ message: 'E-mail já cadastrado' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  senha: string;
}
