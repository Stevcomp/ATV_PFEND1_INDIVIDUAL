import express from 'express';
import { criarFerramentaModel } from './models/FerramentaModel.js';
import { criarFerramentaService } from './services/FerramentaService.js';
import { criarFerramentaController } from './controllers/FerramentaController.js';
import { criarFerramentaRoutes } from './routes/ferramentaRoutes.js';

export const app = express();

app.use(express.json());
// Adiciona cabeçalhos CORS para permitir que o navegador do front-end acesse a API.
app.use((req, res, next) => {
  // Permite chamadas vindas de qualquer origem (domínio/porta).
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Informa ao navegador quais métodos HTTP a API aceita.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // Permite que a requisição envie o cabeçalho Content-Type, usado para indicar JSON.
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // Responde à verificação preliminar do navegador sem seguir até as rotas.
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Cria cada camada e entrega a camada anterior para a seguinte.
const ferramentaModel = criarFerramentaModel();
const ferramentaService = criarFerramentaService({ ferramentaModel });
const ferramentaController = criarFerramentaController({ ferramentaService });
const ferramentaRoutes = criarFerramentaRoutes({ ferramentaController });

// Rota simples para confirmar que o servidor está respondendo.
app.get('/api/check', (req, res) => {
  res.status(200).json({
    status: 'ok', mensagem: 'Servidor funcionando via HTTP!'
  });
});

// Encaminha todas as rotas começando com /api/ferramentas ao roteador de ferramentas.
app.use('/api/ferramentas', ferramentaRoutes);

// Se nenhuma rota anterior atender à requisição, responde com erro 404.
app.use((req, res) => {
  res.status(404).json({ erro: `A rota ${req.method} ${req.originalUrl} não existe` });
});

// Captura erros encaminhados pelo Express e responde com erro interno 500.
app.use((erro, req, res, _next) => {
  // Registra no terminal a mensagem técnica do erro para ajudar na investigação.
  console.error('Erro de sistema:', erro.message);
  res.status(500).json({ erro: 'Falha interna do servidor.' });
});
