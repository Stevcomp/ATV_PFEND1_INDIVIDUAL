export function criarFerramentaController({ ferramentaService }) {
  async function listar(req, res, next) {
    try {
      const ferramentas = await ferramentaService.listar(req.query);
      return res.status(200).json({ sucesso: true, dados: ferramentas });
    } catch (erro) { return next(erro); }
  }

  async function buscar(req, res, next) {
    try {
      const ferramenta = await ferramentaService.buscarPorId(req.params.id);
      return res.status(200).json({ sucesso: true, dados: ferramenta });
    } catch (erro) { return next(erro); }
  }

  async function criar(req, res, next) {
    try {
      const ferramenta = await ferramentaService.criar(req.body);
      return res.status(201).json({ sucesso: true, dados: ferramenta });
    } catch (erro) { return next(erro); }
  }

  async function atualizar(req, res, next) {
    try {
      const ferramenta = await ferramentaService.atualizar(req.params.id, req.body);
      return res.status(200).json({ sucesso: true, dados: ferramenta });
    } catch (erro) { return next(erro); }
  }

  async function excluir(req, res, next) {
    try {
      await ferramentaService.excluir(req.params.id);
      return res.status(204).end();
    } catch (erro) { return next(erro); }
  }

  return { listar, buscar, criar, atualizar, excluir };
}