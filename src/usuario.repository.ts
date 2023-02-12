export class UsuarioRepository {
  private usuarios = [];

  async salvar(usuario) {
    this.usuarios.push(usuario);
    console.clear();
    console.log(this.usuarios);
  }

  async listar() {
    return this.usuarios;
  }
}
