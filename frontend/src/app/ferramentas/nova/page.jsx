"use client";

import { useRouter } from "next/navigation";
import FormFerramenta from "@/components/FormFerramenta";
import { API_FERRAMENTAS, chamarApi } from "@/components/FormFerramenta";

export default function NovaFerramentaPage() {
  const router = useRouter();

  // Envia os dados do formulário à API e retorna ao catálogo após o cadastro.
  async function salvar(dados) {
    await chamarApi(API_FERRAMENTAS, {
      method: "POST",
      // Informa que o conteúdo está em JSON para o servidor interpretá-lo corretamente.
      headers: { "Content-Type": "application/json" },
      // Converte os dados do formulário para JSON.
      body: JSON.stringify(dados),
    });
    // Redireciona o usuário de volta ao catálogo.
    router.push("/?mensagem=cadastrada");
  }

  // Mostra o formulário usado para cadastrar uma nova ferramenta.
  return (
    <div className="container py-4">
      <div className="card form-card">
        <div className="card-body p-4">
          <h1 className="h2 mb-2">Cadastrar ferramenta</h1>
          <p className="text-secondary mb-4">Informe os dados do recurso que deseja incluir no catálogo.</p>
          <FormFerramenta onSubmit={salvar} textoBotao="Cadastrar" />
        </div>
      </div>
    </div>
  );
}