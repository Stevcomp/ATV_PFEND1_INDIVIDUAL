import express from 'express';

// Cria as rotas de ferramentas usando o controller configurado pelo app.js.
export function criarFerramentaRoutes({ ferramentaController }) {
  // Cria um router para agrupar os caminhos relacionados às ferramentas.
  const router = express.Router();

  // Associa cada método HTTP e caminho à operação correspondente do controller.
  router.get('/', ferramentaController.listar);
  router.get('/:id', ferramentaController.buscar);
  router.post('/', ferramentaController.criar);
  router.put('/:id', ferramentaController.atualizar);
  router.delete('/:id', ferramentaController.excluir);

  return router;
}
