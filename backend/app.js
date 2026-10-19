import express from 'express';
import { criarFerramentaModel } from './models/FerramentaModel.js';
import { criarFerramentaService } from './services/FerramentaService.js';
import { criarFerramentaController } from './controllers/FerramentaController.js';
import { criarFerramentaRoutes } from './routes/ferramentaRoutes.js';

export const app = express();

// Conecta as camadas da API e define middlewares, rotas e respostas de erro.
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

const ferramentaModel = criarFerramentaModel();
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
