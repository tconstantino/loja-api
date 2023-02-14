import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { EmailUnicoValidator } from './validacao/emailUnico.validator';
import { UsuarioExistenteValidator } from './validacao/usuarioExistente.validator';

@Module({
  controllers: [UsuarioController],
  providers: [
    UsuarioRepository,
    EmailUnicoValidator,
    UsuarioExistenteValidator,
  ],
})
export class UsuarioModule {}
