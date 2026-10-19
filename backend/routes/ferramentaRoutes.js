import express from 'express';

export function criarFerramentaRoutes({ ferramentaController }) {
    // Cada rota liga um método e caminho HTTP à operação do controller.
    const router = express.Router();

    router.get('/', ferramentaController.listar);
    router.get('/:id', ferramentaController.buscar);
    router.post('/', ferramentaController.criar);
    router.put('/:id', ferramentaController.atualizar);
    router.delete('/:id', ferramentaController.excluir);
    return router
}
