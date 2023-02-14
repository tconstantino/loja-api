import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriarUsuarioDTO } from './dto/criarUsuario.dto';
import { UsuarioRepository } from './usuario.repository';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criarUsuario(@Body() usuario: CriarUsuarioDTO) {
    this.usuarioRepository.salvar(usuario);
    return { mensagem: 'usuario criado!', usuario };
  }

  @Get()
  async listarUsuarios() {
    return this.usuarioRepository.listar();
  }
}
