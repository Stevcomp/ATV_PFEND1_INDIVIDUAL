import Ferramenta from '../models/Ferramenta.js';

// Aplica regras e validações antes de pedir ao model para alterar os dados.
export function criarFerramentaService({ ferramentaModel }) {
  async function listar() {
    return ferramentaModel.listarTodos();
  }

  async function buscarPorId(idRecebido) {
    const id = Number(idRecebido);
    if (!Number.isInteger(id) || id <= 0) {
      throw new TypeError('ID deve ser um número inteiro positivo.');
    }
    const ferramenta = await ferramentaModel.buscarPorId(id);
    if (!ferramenta) throw new Error(`Ferramenta ${id} não encontrada.`);
    return ferramenta;
  }

  async function criar(dados) {
    const ferramenta = new Ferramenta(dados ?? {});
    return ferramentaModel.criar(ferramenta);
  }

  async function atualizar(idRecebido, dados) {
    const id = Number(idRecebido);
    if (!Number.isInteger(id) || id <= 0) {
      throw new TypeError('ID deve ser um número inteiro positivo.');
    }
    const ferramenta = new Ferramenta({ ...(dados ?? {}), id });
    const atualizada = await ferramentaModel.atualizar(id, ferramenta);
    if (!atualizada) throw new Error(`Ferramenta ${id} não encontrada.`);
    return atualizada;
  }

  async function excluir(idRecebido) {
    const id = Number(idRecebido);
    if (!Number.isInteger(id) || id <= 0) {
      throw new TypeError('ID deve ser um número inteiro positivo.');
    }
    const removida = await ferramentaModel.excluir(id);
    if (!removida) throw new Error(`Ferramenta ${id} não encontrada.`);
    return removida;
  }

  return { listar, buscarPorId, criar, atualizar, excluir };
}
