import Ferramenta from '../models/Ferramenta.js';

// Aplica regras e validações antes de pedir ao model para alterar os dados.
export function criarFerramentaService({ ferramentaModel }) {
  // Solicita ao model todas as ferramentas armazenadas.
  async function listar() {
    return ferramentaModel.listarTodos();
  }

  // Valida o ID recebido e busca a ferramenta correspondente no model.
  async function buscarPorId(idRecebido) {
    const id = Number(idRecebido);
    // Exige um ID inteiro positivo antes de consultar o model.
    if (!Number.isInteger(id) || id <= 0) {
      throw new TypeError('ID deve ser um número inteiro positivo.');
    }
    const ferramenta = await ferramentaModel.buscarPorId(id);
    // Informa que a ferramenta não existe para que o controller responda com 404.
    if (!ferramenta) throw new Error(`Ferramenta ${id} não encontrada.`);
    return ferramenta;
  }

  // Cria e valida uma instância de Ferramenta antes de armazená-la no model.
  async function criar(dados) {
    const ferramenta = new Ferramenta(dados ?? {});
    return ferramentaModel.criar(ferramenta);
  }

  // Valida o ID, prepara os novos dados e pede ao model para atualizar a ferramenta.
  async function atualizar(idRecebido, dados) {
    const id = Number(idRecebido);
    // Exige um ID inteiro positivo antes de tentar atualizar.
    if (!Number.isInteger(id) || id <= 0) {
      throw new TypeError('ID deve ser um número inteiro positivo.');
    }
    const ferramenta = new Ferramenta({ ...(dados ?? {}), id });
    const atualizada = await ferramentaModel.atualizar(id, ferramenta);
    // Informa que não foi possível atualizar porque o ID não existe no model.
    if (!atualizada) throw new Error(`Ferramenta ${id} não encontrada.`);
    return atualizada;
  }

  // Valida o ID e pede ao model para remover a ferramenta correspondente.
  async function excluir(idRecebido) {
    const id = Number(idRecebido);
    // Exige um ID inteiro positivo antes de tentar excluir.
    if (!Number.isInteger(id) || id <= 0) {
      throw new TypeError('ID deve ser um número inteiro positivo.');
    }
    const removida = await ferramentaModel.excluir(id);
    // Informa que não foi possível excluir porque o ID não existe no model.
    if (!removida) throw new Error(`Ferramenta ${id} não encontrada.`);
    return removida;
  }

  // Disponibiliza as operações para o controller.
  return { listar, buscarPorId, criar, atualizar, excluir };
}






// codigo base: 
// import Produto from '../models/Produto.js';

// export function criarProdutoService({ produtoModel }) {
//     async function listar() {
//         return produtoModel.listarTodos();
//     }

//     async function buscarPorId(idRecebido) {
//         const id = Number(idRecebido);
//         if (!Number.isInteger(id) || id <= 0) {
//             throw new TypeError('ID dev ser um número inteiro positivo');
//         }

//         const produto = await produtoModel.buscarPorId(id);
//         if (!produto) throw new Error(`Produto ${id} não encontrado`);
//         return produto;

//     }

//     async function criar(dados) {
//         const produto = new Produto({ id: 1, ...dados });
//         return produtoModel.criar({
//             nome: produto.nome,
//             preco: produto.preco,
//             estoque: produto.estoque,
//             categoria: produto.categoria
//         });
//     }

//     return { listar, buscarPorId, criar }

// }