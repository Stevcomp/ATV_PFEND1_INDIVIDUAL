import Ferramenta from '../models/Ferramenta.js';

export function criarFerramentaService({ ferramentaModel }) {
    async function listar() {
        return ferramentaModel.listarTodos();
    }

    async function buscarPorId(idRecebido) {
        const id = Number(idRecebido);
        if (!Number.isInteger(id) || id <= 0) {
            throw new TypeError('ID dev ser um número inteiro positivo');
        }

        const ferramenta = await ferramentaModel.buscarPorId(id);
        if (!ferramenta) throw new Error(`Ferramenta ${id} não encontrada`);
        return ferramenta;

    }

    async function criar(dados) {
        const ferramenta = new Ferramenta(dados);
        return ferramentaModel.criar({
            nome: ferramenta.nome,
            categoria: ferramenta.categoria,
            tipo: ferramenta.tipo,
            descricao: ferramenta.descricao,
            link: ferramenta.link,
            usuario_id: ferramenta.usuario_id
        });
    }

    return { listar, buscarPorId, criar }

}
