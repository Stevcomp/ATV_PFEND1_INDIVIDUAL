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
    const indice = ferramentas.findIndex((item) => item.id === id);
    if (indice === -1) return null;
    ferramentas[indice] = { ...ferramenta, id };
    return { ...ferramentas[indice] };
  }

  async function excluir(id) {
    const indice = ferramentas.findIndex((item) => item.id === id);
    if (indice === -1) return null;
    const [removida] = ferramentas.splice(indice, 1);
    return { ...removida };
  }

  return { listarTodos, buscarPorId, criar, atualizar, excluir };
}
