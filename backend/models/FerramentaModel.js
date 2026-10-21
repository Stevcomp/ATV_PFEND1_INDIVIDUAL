// Guarda os registros em memória; reiniciar a API cria um array vazio.
export function criarFerramentaModel() {
  const ferramentas = [];
  let proximoId = 1;

  async function listarTodos() {
    // Retorna cópias para que a resposta da API não altere o array diretamente.
    return ferramentas.map((ferramenta) => ({ ...ferramenta }));
  }

  async function buscarPorId(id) {
    const ferramenta = ferramentas.find((item) => item.id === id);
    return ferramenta ? { ...ferramenta } : null;
  }

  async function criar(ferramenta) {
    const novaFerramenta = { ...ferramenta, id: proximoId++ };
    ferramentas.push(novaFerramenta);
    return { ...novaFerramenta };
  }

  async function atualizar(id, ferramenta) {
    // Procura a posição da ferramenta que tem o ID recebido.
    const indice = ferramentas.findIndex((item) => item.id === id);
    if (indice === -1) return null;
    // Substitui os dados nessa posição e mantém o ID original.
    ferramentas[indice] = { ...ferramenta, id };
    return { ...ferramentas[indice] };
  }

  async function excluir(id) {
    const indice = ferramentas.findIndex((item) => item.id === id);
    if (indice === -1) return null;

    // Remove um item dessa posição; splice devolve os itens removidos.
    // Os colchetes guardam o primeiro item removido na variável "removida".
    const [removida] = ferramentas.splice(indice, 1);
    return { ...removida };
  }

  return { listarTodos, buscarPorId, criar, atualizar, excluir };
}
