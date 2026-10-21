import { existsSync } from 'node:fs';

// Usa PORT quando informada (no caso do projeto local, a API fica na porta 3001); Se o arquivoDeConfiguracao (.env) não existir, a API carrega a mensagem de erro.
export function carregarAmbiente(arquivoDeConfiguracao) {
  if (arquivoDeConfiguracao && existsSync(arquivoDeConfiguracao)) {
    process.loadEnvFile(arquivoDeConfiguracao);
  }

  const porta = Number(process.env.PORT || 3001);
  if (!Number.isInteger(porta) || porta !== 3001) {
    throw new Error('PORT deve ser 3001');
  }

  return { port: porta };
}
