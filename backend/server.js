import { carregarAmbiente } from './config/ambiente.js';

// Ponto de entrada: carrega a porta e inicia o servidor HTTP.
const config = carregarAmbiente('.env');

const { app } = await import('./app.js');
const porta = config.port;

app.listen(porta, () => {
  console.log(`Servidor rodando em: http://localhost:${porta}`);
});
