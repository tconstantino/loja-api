import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AtualizarUsuarioDTO } from './dto/atualizarUsuario.dto';
import { CriarUsuarioDTO } from './dto/criarUsuario.dto';
import { ListarUsuarioDTO } from './dto/listarUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criarUsuario(@Body() dadosUsuario: CriarUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosUsuario.email;
    usuarioEntity.nome = dadosUsuario.nome;
    usuarioEntity.senha = dadosUsuario.senha;

    const usuario = await this.usuarioRepository.salvar(usuarioEntity);

    return new ListarUsuarioDTO(usuario.id, usuario.nome, usuario.email);
  }

  @Get()
  async listarUsuarios() {
    const usuarios = await this.usuarioRepository.listar();
    const lista = usuarios.map(
      (u) => new ListarUsuarioDTO(u.id, u.nome, u.email),
    );

    return lista;
  }

  @Put('/:id')
  async atualizarUsuario(
    @Param('id') id: string,
    @Body() dadosUsuario: AtualizarUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioRepository.atualizar(
      id,
      dadosUsuario,
    );

    return new ListarUsuarioDTO(
      usuarioAtualizado.id,
      usuarioAtualizado.nome,
      usuarioAtualizado.email,
    );
  }
}
