const nomesObrigatorios = ['DB_HOST', 'DB_USER', 'DB_PORT', 'DB_NAME'];

export function carregarAmbiente(arquivoDeConfiguracao) {
  if (arquivoDeConfiguracao) {
    try {
      process.loadEnvFile(arquivoDeConfiguracao);
    } catch {
      throw new Error(`Arquivo de configuração não encontrado: ${arquivoDeConfiguracao}`);
    }
  }

  const ausentes = nomesObrigatorios.filter((nome) => {
    const valor = process.env[nome];
    return typeof valor !== 'string' || valor.trim() === '';
  });

  if (ausentes.length > 0) {
    throw new Error(`Configure no .env: ${ausentes.join(', ')}`);
  }

  const porta = Number(process.env.PORT || 3000);
  if (!Number.isInteger(porta) || porta <= 0 || porta > 65535) {
    throw new Error('PORT deve ser um número entre 1 e 65535.');
  }

  return {
    nomeAluno: process.env.NOME_ALUNO,
    turma: process.env.TURMA,
    port: porta,
    ambiente: process.env.NODE_ENV || 'development'
  };
}

export function exibirDiagnostico(configuracao) {
  console.table({
    estudante: configuracao.nomeAluno,
    turma: configuracao.turma,
    projeto: 'api-ferramentas',
    ambiente: configuracao.ambiente,
    node: process.version,
    sistema: `${process.platform} ${process.arch}`,
    diretorio: process.cwd(),
    portaConfigurada: configuracao.port
  });
}
