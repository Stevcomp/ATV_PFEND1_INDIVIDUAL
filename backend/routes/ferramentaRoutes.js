import express from 'express';

export function criarFerramentaRoutes({ ferramentaController }) {
    const router = express.Router();

    router.get('/', ferramentaController.listar);
    router.get('/:id', ferramentaController.buscar);
    router.post('/', ferramentaController.criar);
    router.put('/:id', ferramentaController.editar);
    router.delete('/:id', ferramentaController.deletar);
    return router
}
