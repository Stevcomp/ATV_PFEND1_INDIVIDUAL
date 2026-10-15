import express from 'express';
import { criarPool } from './config/database.js';
import { criarFerramentaModel } from './models/FerramentaModel.js';
import { criarFerramentaService } from './services/FerramentaService.js';
import { criarFerramentaController } from './controllers/FerramentaController.js';
import { criarFerramentaRoutes } from './routes/ferramentaRoutes.js';

export const app = express();

// Middleware: ensina o Express a ler o corpo da requisição em JSON
app.use(express.json());

const pool = criarPool();
const ferramentaModel = criarFerramentaModel({ pool });
const ferramentaService = criarFerramentaService({ ferramentaModel });
const ferramentaController = criarFerramentaController({ ferramentaService });
const ferramentaRoutes = criarFerramentaRoutes({ ferramentaController });

app.get('/api/check', (req, res) => {
  res.status(200).json({
    status: 'ok', mensagem: 'Servidor funcionando via HTTP!'
  });
});

app.use('/api/ferramentas', ferramentaRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: `A rota ${req.method} ${req.originalUrl} não existe` });
});

app.use((erro, req, res, _next) => {
  console.error('Erro de sistema:', erro.message);
  res.status(500).json({ erro: 'Falha interna do servidor.' });
});
