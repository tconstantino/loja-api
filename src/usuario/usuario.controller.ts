import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriarUsuarioDTO } from './dto/criarUsuario.dto';
import { UsuarioRepository } from './usuario.repository';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criarUsuario(@Body() usuario: CriarUsuarioDTO) {
    return await this.usuarioRepository.salvar(usuario);
  }

  @Get()
  async listarUsuarios() {
    return await this.usuarioRepository.listar();
  }
}
