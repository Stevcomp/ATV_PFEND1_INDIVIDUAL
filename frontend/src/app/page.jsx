"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CardFerramenta from "@/components/CardFerramenta";

// A URL pode ser configurada no ambiente; localmente, a API usa a porta 3001.
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api").replace(/\/+$/, "");
const API = `${API_BASE}/ferramentas`;

async function lerResposta(resposta) {
  // Evita tentar interpretar como JSON uma página HTML de erro ou configuração.
  if (!resposta.headers.get("content-type")?.includes("application/json")) {
    throw new Error("A resposta não veio em JSON. Verifique se a API está ativa e se NEXT_PUBLIC_API_URL aponta para ela.");
  }
  return resposta.json();
}

export default function HomePage() {
  const [ferramentas, setFerramentas] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    // Mostra mensagens de retorno após cadastro/edição e carrega o catálogo.
    const chave = new URLSearchParams(window.location.search).get("mensagem");
    if (chave === "cadastrada") setMensagem("Ferramenta cadastrada com sucesso.");
    if (chave === "atualizada") setMensagem("Ferramenta atualizada com sucesso.");
    if (chave) window.history.replaceState(null, "", "/");

    async function carregarFerramentas() {
      try {
        const resposta = await fetch(API);
        const resultado = await lerResposta(resposta);
        if (!resposta.ok) throw new Error(resultado.erro || "Não foi possível carregar as ferramentas.");
        setFerramentas(resultado.dados || []);
      } catch (error) {
        setErro(error instanceof TypeError
          ? "Não foi possível conectar à API em localhost:3001. Inicie o back-end com npm run dev na pasta backend."
          : error.message || "Não foi possível conectar à API.");
      } finally {
        setCarregando(false);
      }
    }

    carregarFerramentas();
  }, []);

  async function excluirFerramenta(id) {
    if (!window.confirm("Deseja excluir esta ferramenta?")) return;
    setErro("");
    setMensagem("");
    try {
      const resposta = await fetch(`${API}/${id}`, { method: "DELETE" });
      const resultado = await lerResposta(resposta);
      if (!resposta.ok) throw new Error(resultado.erro || "Não foi possível excluir a ferramenta.");
      setFerramentas((atuais) => atuais.filter((item) => item.id !== id));
      setMensagem("Ferramenta excluída com sucesso.");
    } catch (error) {
      setErro(error instanceof TypeError
        ? "Não foi possível conectar à API em localhost:3001. Inicie o back-end com npm run dev na pasta backend."
        : error.message || "Não foi possível conectar à API.");
    }
  }

  // A busca é feita no navegador pelos campos principais do registro.
  const filtradas = ferramentas.filter((item) =>
    [item.nome, item.categoria, item.tipo, item.descricao]
      .join(" ")
      .toLocaleLowerCase("pt-BR")
      .includes(busca.trim().toLocaleLowerCase("pt-BR"))
  );

  return (
    <div className="container py-4 py-lg-5">
      <div className="destaque mb-4 mb-lg-5">
        <div className="destaque-texto">
          <p className="destaque-titulo">Recursos para quem constrói na web</p>
          <h1>Ferramentas para tirar ideias do papel.</h1>
          <p className="destaque-descricao">Descubra, organize e mantenha à mão os recursos que fazem parte do seu trabalho.</p>
        </div>
        <Link className="btn btn-light btn-lg" href="/ferramentas/nova">＋ Cadastrar ferramenta</Link>
      </div>

      {mensagem && <div className="alert alert-success" role="status">{mensagem}</div>}
      {erro && <div className="alert alert-danger" role="alert">{erro}</div>}

      <div className="busca mb-4 mb-lg-5">
        <label className="form-label" htmlFor="busca">Buscar ferramentas</label>
        <input id="busca" className="form-control" type="search" value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Nome, categoria ou descrição" />
      </div>

      {carregando ? <p role="status">Carregando ferramentas...</p> : filtradas.length > 0 ? (
        <div className="row g-3">
          {filtradas.map((item) => (
            <div className="col-12 col-md-6 col-lg-4" key={item.id}>
              <CardFerramenta ferramenta={item} onExcluir={excluirFerramenta} />
            </div>
          ))}
        </div>
      ) : (
        <div className="vazio alert alert-light border">
          {busca ? "Nenhuma ferramenta corresponde à busca." : "O catálogo está vazio. Cadastre a primeira ferramenta."}
        </div>
      )}
    </div>
  );
}
