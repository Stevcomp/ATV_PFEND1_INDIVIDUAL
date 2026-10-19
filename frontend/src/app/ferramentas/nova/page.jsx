"use client";

import { useRouter } from "next/navigation";
import FormFerramenta from "@/components/FormFerramenta";

// Esta página envia novos registros para a API Express.
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api").replace(/\/+$/, "");
const API = `${API_BASE}/ferramentas`;

async function lerResposta(resposta) {
  // Mostra uma mensagem clara se a URL configurada responder com HTML.
  if (!resposta.headers.get("content-type")?.includes("application/json")) {
    throw new Error("A resposta não veio em JSON. Verifique se a API está ativa e se NEXT_PUBLIC_API_URL aponta para ela.");
  }
  return resposta.json();
}

export default function NovaFerramentaPage() {
  const router = useRouter();

  async function salvar(dados) {
    const resposta = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    const resultado = await lerResposta(resposta);
    if (!resposta.ok) throw new Error(resultado.erro || "Não foi possível cadastrar a ferramenta.");
    router.push("/?mensagem=cadastrada");
  }

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
