import { carregarAmbiente } from './config/ambiente.js';

const config = carregarAmbiente('.env');

const { app } = await import('./app.js');
const porta = config.port || 3000;

app.listen(porta, () => {
  console.log(`Servidor Rodando em: http://localhost:${porta}`);
});
