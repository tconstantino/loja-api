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
    const usuario = await this.obterPeloId(id);

    if (usuario) {
      delete dadosUsuario.id;

      Object.entries(dadosUsuario).forEach(([chave, valor]) => {
        usuario[chave] = valor;
      });
    }

    return usuario;
  }

  async obterPeloId(id: string) {
    return this.usuarios.find((u) => u.id === id);
  }

  async existeComEmail(email: string) {
    const possivelUsuario = this.usuarios.find((u) => u.email === email);

    return possivelUsuario !== undefined;
  }

  async remover(id: string) {
    const usuario = await this.obterPeloId(id);

    if(usuario) {
      const indice = this.usuarios.indexOf(usuario);
      this.usuarios.splice(indice, 1);
    }

    return usuario;
  }
}
