import { existsSync } from 'node:fs';

// Carrega o arquivo de ambiente, se informado, e valida a porta da API.
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
