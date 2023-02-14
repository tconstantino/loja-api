import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CriarUsuarioDTO } from './dto/criarUsuario.dto';

@Injectable()
export class UsuarioRepository {
  private usuarios = [];

  async salvar(usuario: CriarUsuarioDTO) {
    const novoUsuario = { id: randomUUID(), ...usuario };
    this.usuarios.push(novoUsuario);
    return novoUsuario;
  }

  async listar() {
    return this.usuarios;
  }

  async obterPeloId(id) {
    return this.usuarios.find((u) => u.id === id);
  }

  async existeComEmail(email: string) {
    const possivelUsuario = this.usuarios.find((u) => u.email === email);

    return possivelUsuario !== undefined;
  }
}
