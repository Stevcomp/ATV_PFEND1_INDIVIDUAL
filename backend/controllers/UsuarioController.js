export function criarUsuarioController({ usuarioService }) {
  async function cadastrar(req, res, next) {
    try {
      const usuario = await usuarioService.cadastrar(req.body);
      return res.status(201).json({ sucesso: true, dados: usuario });
    } catch (erro) { return next(erro); }
  }

  async function login(req, res, next) {
    try {
      const usuario = await usuarioService.login(req.body);
      return res.status(200).json({ sucesso: true, dados: usuario });
    } catch (erro) { return next(erro); }
  }

  return { cadastrar, login };
}