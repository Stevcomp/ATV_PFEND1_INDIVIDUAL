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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    router.push("/?mensagem=cadastrada");
  }

  // Mostra o formulário usado para cadastrar uma nova ferramenta.
  return (
    <div className="container py-4">
      <div className="card formulario-card">
        <div className="card-body p-4">
          <h1 className="h2 mb-2">Cadastrar ferramenta</h1>
          <p className="text-secondary mb-4">Informe os dados do recurso que deseja incluir no catálogo.</p>
          <FormFerramenta onSubmit={salvar} textoBotao="Cadastrar" />
        </div>
      </div>
    </div>
  );
}
