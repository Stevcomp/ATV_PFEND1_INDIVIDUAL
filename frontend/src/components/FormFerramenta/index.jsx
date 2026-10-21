"use client";

import { useState } from "react";
import Link from "next/link";

// Monta o endereço base usado pelo front-end para chamar a API
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api");
export const API_FERRAMENTAS = `${API_BASE}/ferramentas`;

// Envia uma requisição à API e retorna os dados da resposta.
export async function chamarApi(url, opcoes = {}) {
  const resposta = await fetch(url, opcoes);
  if (!resposta.headers.get("content-type")?.includes("application/json")) {
    throw new Error("A resposta não veio em JSON. Verifique se a API está ativa e se NEXT_PUBLIC_API_URL aponta para ela.");
  }

  const resultado = await resposta.json();
  if (!resposta.ok) {
    const erro = new Error("Não foi possível concluir a requisição.");
    erro.status = resposta.status;
    throw erro;
  }

  return resultado;
}

const VAZIO = { nome: "", categoria: "", tipo: "", descricao: "", link: "" };

// Formulário compartilhado pelo cadastro e pela edição.
export default function FormFerramenta({ valores = VAZIO, onSubmit, textoBotao }) {
  const [form, setForm] = useState({ ...VAZIO, ...valores });
  const [erro, setErro] = useState("Falha ao enviar o formulário. Reveja os campos e tente novamente.");
  const [salvando, setSalvando] = useState(false);

  // Copia os dados atuais e atualiza somente o campo que disparou o evento, usando seu name como propriedade e o texto digitado como valor.
  function alterar(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function enviar(event) {
    // Impede que a pagina seja recarregada ao enviar o formulário.
    event.preventDefault();
    setErro("");
    setSalvando(true);
    try {
      await onSubmit(form);
    } catch (error) {
      setErro(error instanceof TypeError
        ? "Não foi possível conectar à API em localhost:3001. Inicie o back-end com npm run dev na pasta backend."
        : "Não foi possível salvar a ferramenta.");
      setSalvando(false);
    }
  }

  return (
    <form onSubmit={enviar}>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label className="form-label" htmlFor="nome">Nome</label>
          <input className="form-control" id="nome" name="nome" value={form.nome} onChange={alterar} maxLength={120} required />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label" htmlFor="categoria">Categoria</label>
          <input className="form-control" id="categoria" name="categoria" value={form.categoria} onChange={alterar} maxLength={80} required />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label" htmlFor="tipo">Tipo</label>
          <input className="form-control" id="tipo" name="tipo" value={form.tipo} onChange={alterar} maxLength={80} />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label" htmlFor="link">Link</label>
          <input className="form-control" id="link" name="link" type="url" value={form.link} onChange={alterar} placeholder="https://exemplo.com" required />
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="descricao">Descriçãoo</label>
          <textarea className="form-control" id="descricao" name="descricao" rows={4} maxLength={1000} value={form.descricao} onChange={alterar} required />
        </div>
      </div>

      {erro && <div className="alert alert-danger mt-3" role="alert">{erro}</div>}
      <div className="d-flex gap-2 mt-4">
        <button className="btn btn-primary" type="submit" disabled={salvando}>{salvando ? "Salvando..." : textoBotao}</button>
        <Link className="btn btn-secondary" href="/">Cancelar</Link>
      </div>
    </form>
  );
}
