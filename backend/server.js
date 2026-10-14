import express from 'express';
import cors from 'cors';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { carregarAmbiente, exibirDiagnostico } from './config/ambiente.js';
import { criarPool } from './config/database.js';
import { criarUsuarioModel } from './models/UsuarioModel.js';
import { criarFerramentaModel } from './models/FerramentaModel.js';
import { criarUsuarioService } from './services/UsuarioService.js';
import { criarFerramentaService } from './services/FerramentaService.js';
import { criarUsuarioController } from './controllers/UsuarioController.js';
import { criarFerramentaController } from './controllers/FerramentaController.js';
import { criarUsuarioRoutes } from './routes/usuarioRoutes.js';
import { criarFerramentaRoutes } from './routes/ferramentaRoutes.js';

const arquivoEnv = join(dirname(fileURLToPath(import.meta.url)), '.env');
const configuracao = carregarAmbiente(arquivoEnv);
const pool = criarPool();
const usuarioModel = criarUsuarioModel({ pool });
const ferramentaModel = criarFerramentaModel({ pool });
const usuarioService = criarUsuarioService({ usuarioModel });
const ferramentaService = criarFerramentaService({ ferramentaModel, usuarioModel });
const usuarioController = criarUsuarioController({ usuarioService });
const ferramentaController = criarFerramentaController({ ferramentaService });
const app = express();

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3005' }));
app.use(express.json());
app.use('/api/usuarios', criarUsuarioRoutes({ usuarioController }));
app.use('/api/ferramentas', criarFerramentaRoutes({ ferramentaController }));
app.use((req, res) => res.status(404).json({ erro: 'Rota nÃ£o encontrada.' }));
app.use((erro, req, res, next) => {
  if (erro.code === 'ER_DUP_ENTRY') return res.status(409).json({ erro: 'E-mail jÃ¡ cadastrado.' });
  const status = erro.status || (erro instanceof TypeError ? 400 : 500);
  if (status === 500) console.error(erro);
  return res.status(status).json({ erro: erro.message || 'Erro interno do servidor.' });
});

app.listen(Number(configuracao.porta), () => {
  exibirDiagnostico(configuracao);
  console.log(`Servidor rodando na porta ${configuracao.porta}`);
});