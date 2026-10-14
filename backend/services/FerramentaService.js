import Ferramenta from '../models/Ferramenta.js';

function validarId(valor) {
  const id = Number(valor);
  if (!Number.isInteger(id) || id <= 0) throw new TypeError('ID deve ser um inteiro positivo.');
  return id;
}

export function criarFerramentaService({ ferramentaModel, usuarioModel }) {
  async function listar(filtros) {
    return ferramentaModel.listarTodas({
      q: typeof filtros.q === 'string' ? filtros.q.trim() : '',
      categoria: typeof filtros.categoria === 'string' ? filtros.categoria.trim() : '',
    });
  }

  async function buscarPorId(idRecebido) {
    const ferramenta = await ferramentaModel.buscarPorId(validarId(idRecebido));
    if (!ferramenta) {
      const erro = new Error('Ferramenta nÃ£o encontrada.');
      erro.status = 404;
      throw erro;
    }
    return ferramenta;
  }

  async function criar(dados) {
    const usuarioId = Number(dados.usuario_id);
    if (!Number.isInteger(usuarioId) || usuarioId <= 0 || !(await usuarioModel.buscarPorId(usuarioId))) {
      throw new TypeError('UsuÃ¡rio responsÃ¡vel nÃ£o encontrado.');
    }
    const ferramenta = new Ferramenta(dados);
    return ferramentaModel.criar({ ...ferramenta, usuario_id: usuarioId });
  }

  async function atualizar(idRecebido, dados) {
    const id = validarId(idRecebido);
    await buscarPorId(id);
    return ferramentaModel.atualizar(id, new Ferramenta(dados));
  }

  async function excluir(idRecebido) {
    const id = validarId(idRecebido);
    await buscarPorId(id);
    await ferramentaModel.excluir(id);
  }

  return { listar, buscarPorId, criar, atualizar, excluir };
}