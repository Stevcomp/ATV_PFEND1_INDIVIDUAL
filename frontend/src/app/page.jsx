"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CardFerramenta from "@/components/CardFerramenta";
import { API_FERRAMENTAS, chamarApi } from "@/components/FormFerramenta";

export default function HomePage() {
  // Guarda os dados da tela e os estados de carregamento, busca e mensagens.
  const [ferramentas, setFerramentas] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    // Mostra mensagens de retorno após cadastro ou edição e carrega o catálogo.
    const chave = new URLSearchParams(window.location.search).get("mensagem");
    if (chave === "cadastrada") setMensagem("Ferramenta cadastrada com sucesso.");
    if (chave === "atualizada") setMensagem("Ferramenta atualizada com sucesso.");
    // Não altera o caminho do navegador.
    if (chave) window.history.replaceState(null, "", "/");

    async function carregarFerramentas() {
      try {
        const resultado = await chamarApi(API_FERRAMENTAS);
        setFerramentas(resultado.dados || []);
      } catch (error) {
        setErro(error instanceof TypeError
          // Verifica se o erro é um TypeError e escolhe a mensagem correspondente.
          ? "Não foi possível conectar à API em localhost:3001. Inicie o back-end com npm run dev na pasta backend."
          : "Não foi possível conectar à API, reveja as configurações do sistema.");
      } finally {
        setCarregando(false);
      }
    }

    carregarFerramentas();
  }, []);

  // Confirma a exclusão, remove o registro na API e atualiza a lista exibida.
  // Recebe o pedido de exclusão do CardFerramenta pelo id da ferramenta.
  async function excluirFerramenta(id) {
    if (!window.confirm("Deseja excluir esta ferramenta?")) 
      return;
    try {
      await chamarApi(`${API_FERRAMENTAS}/${id}`, { method: "DELETE" });
      setFerramentas((atuais) => atuais.filter((item) => item.id !== id));
      setMensagem("Ferramenta excluída com sucesso.");
    } catch (error) {
      setErro(error instanceof TypeError
        ? "Não foi possível conectar à API em localhost:3001. Inicie o back-end com npm run dev na pasta backend."
        : "Não foi possível conectar à API.");
    }
  }

  // A busca é feita no navegador pelos campos principais do registro.
  const filtradas = ferramentas.filter((item) =>
    [item.nome, item.categoria, item.tipo, item.descricao]
    // Junta os valores em um único texto para permitir a busca em qualquer campo do registro.
      .join(" ")
      // Converte os dados da ferramenta para letras minúsculas, considerando as regras do português.
      .toLocaleLowerCase("pt-BR")
      // Verifica se os dados contêm o texto buscado, ignorando espaços no início e no fim e diferenças entre maiúsculas e minúsculas.
      .includes(busca.trim().toLocaleLowerCase("pt-BR"))
  );

  // Exibe o catálogo, a busca e os estados de carregamento, erro ou lista vazia.
  return (
    <div className="container py-4 py-lg-5">
      <div className="hero mb-4 mb-lg-5">
        <div className="hero-content">
          <p className="hero-label">Recursos para quem constrói na web</p>
          <h1>Ferramentas para tirar ideias do papel.</h1>
          <p className="hero-description">Descubra, organize e mantenha à mão os recursos que fazem parte do seu trabalho.</p>
        </div>
        <Link className="btn btn-light btn-lg" href="/ferramentas/nova">＋ Cadastrar ferramenta</Link>
      </div>

      {mensagem && <div className="alert alert-success" role="status">{mensagem}</div>}
      {erro && <div className="alert alert-danger" role="alert">{erro}</div>}

      <div className="search mb-4 mb-lg-5">
        <label className="form-label" htmlFor="busca">Buscar ferramentas</label>
        <input id="busca" className="form-control" type="search" value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Nome, categoria ou descrição" />
      </div>

      {carregando ? <p role="status">Carregando ferramentas...</p> : erro ? null : filtradas.length > 0 ? (
        <div className="row g-3">
          {filtradas.map((item) => (
            <div className="col-12 col-md-6 col-lg-4" key={item.id}>
              <CardFerramenta ferramenta={item} onExcluir={excluirFerramenta} />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty alert alert-light border">
          {busca ? "Nenhuma ferramenta corresponde à busca." : "O catálogo está vazio. Cadastre a primeira ferramenta."}
        </div>
      )}
    </div>
  );
}
