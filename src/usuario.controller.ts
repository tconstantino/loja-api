import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';

@Controller('/usuarios')
export class UsuarioController {
  private usuarioRepository = new UsuarioRepository();

  @Post()
  async criarUsuario(@Body() usuario) {
    this.usuarioRepository.salvar(usuario);
    return { mensagem: 'usuario criado!', usuario };
  }

  @Get()
  async listarUsuarios() {
    return this.usuarioRepository.listar();
  }
}
