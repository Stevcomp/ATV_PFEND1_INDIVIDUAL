import bcrypt from 'bcryptjs';
import Usuario from '../models/Usuario.js';

export function criarUsuarioService({ usuarioModel }) {
  async function cadastrar(dados) {
    const usuario = new Usuario(dados);
    const existente = await usuarioModel.listarPorEmail(usuario.email);
    if (existente) {
      const erro = new Error('E-mail jÃ¡ cadastrado.');
      erro.status = 409;
      throw erro;
    }
    usuario.senhaHash = await bcrypt.hash(usuario.senha, 10);
    return usuarioModel.criar(usuario);
  }

  async function login(dados) {
    const email = typeof dados?.email === 'string' ? dados.email.trim().toLowerCase() : '';
    const senha = dados?.senha;
    const usuario = await usuarioModel.listarPorEmail(email);
    if (!usuario || typeof senha !== 'string' || !(await bcrypt.compare(senha, usuario.senha_hash))) {
      const erro = new Error('E-mail ou senha invÃ¡lidos.');
      erro.status = 401;
      throw erro;
    }
    return { id: Number(usuario.id), nome: usuario.nome, email: usuario.email };
  }

  return { cadastrar, login };
}