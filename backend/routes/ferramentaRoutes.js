import express from 'express';

export function criarFerramentaRoutes({ ferramentaController }) {
    const router = express.Router();

    router.get('/', ferramentaController.listar);
    router.get('/:id', ferramentaController.buscar);
    router.post('/', ferramentaController.criar);
    return router
}
