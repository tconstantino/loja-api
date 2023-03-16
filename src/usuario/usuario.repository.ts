import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];

  async salvar(usuario: UsuarioEntity) {
    usuario.id = randomUUID();
    this.usuarios.push(usuario);
    return usuario;
  }

  async listar() {
    return this.usuarios;
  }

  async atualizar(id: string, dadosUsuario: Partial<UsuarioEntity>) {
    const usuario = this.usuarios.find((u) => u.id === id);

    if (!usuario) {
      throw new Error('Usuário não existe');
    }

    delete dadosUsuario.id;

    Object.entries(dadosUsuario).forEach(([chave, valor]) => {
      usuario[chave] = valor;
    });

    return usuario;
  }

  async obterPeloId(id) {
    return this.usuarios.find((u) => u.id === id);
  }

  async existeComEmail(email: string) {
    const possivelUsuario = this.usuarios.find((u) => u.email === email);

    return possivelUsuario !== undefined;
  }
}
