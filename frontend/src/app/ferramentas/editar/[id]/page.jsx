"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FormFerramenta from "@/components/FormFerramenta";

// Usa o ID da URL para carregar e atualizar o registro selecionado.
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api").replace(/\/+$/, "");
const API = `${API_BASE}/ferramentas`;

async function lerResposta(resposta) {
  // Mostra uma mensagem clara se a URL configurada responder com HTML.
  if (!resposta.headers.get("content-type")?.includes("application/json")) {
    throw new Error("A resposta não veio em JSON. Verifique se a API está ativa e se NEXT_PUBLIC_API_URL aponta para ela.");
  }
  return resposta.json();
}

export default function EditarFerramentaPage() {
  const { id } = useParams();
  const router = useRouter();
  const [ferramenta, setFerramenta] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarFerramenta() {
      try {
        const resposta = await fetch(`${API}/${id}`);
        const resultado = await lerResposta(resposta);
        if (resposta.status === 404) {
          // A API guarda os dados em memória; reiniciá-la apaga os registros.
          throw new Error("Esta ferramenta não está na API atual. Os registros ficam em memória e são apagados quando o back-end reinicia. Volte ao catálogo e cadastre novamente.");
        }
        if (!resposta.ok) throw new Error(resultado.erro || "Não foi possível carregar a ferramenta.");
        setFerramenta(resultado.dados);
      } catch (error) {
        setErro(error instanceof TypeError
          ? "Não foi possível conectar à API em localhost:3001. Inicie o back-end com npm run dev na pasta backend."
          : error.message || "Não foi possível conectar à API.");
      } finally {
        setCarregando(false);
      }
    }

    carregarFerramenta();
  }, [id]);

  async function salvar(dados) {
    const resposta = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    const resultado = await lerResposta(resposta);
    if (!resposta.ok) throw new Error(resultado.erro || "Não foi possível atualizar a ferramenta.");
    router.push("/?mensagem=atualizada");
  }

  return (
    <div className="container py-4">
      <div className="card formulario-card">
        <div className="card-body p-4">
          <h1 className="h2 mb-2">Editar ferramenta</h1>
          <p className="text-secondary mb-4">Atualize os dados deste registro.</p>
          {carregando && <p role="status">Carregando ferramenta...</p>}
          {erro && <div className="alert alert-danger" role="alert">{erro}</div>}
          {ferramenta && <FormFerramenta key={ferramenta.id} valores={ferramenta} onSubmit={salvar} textoBotao="Salvar alterações" />}
          {!carregando && erro && <a className="btn btn-outline-secondary mt-3" href="/">Voltar ao catálogo</a>}
        </div>
      </div>
    </div>
  );
}
