import express from 'express';

export function criarUsuarioRoutes({ usuarioController }) {
  const router = express.Router();
  router.post('/', usuarioController.cadastrar);
  router.post('/login', usuarioController.login);
  return router;
}