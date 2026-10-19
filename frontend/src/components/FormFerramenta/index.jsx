"use client";

import { useState } from "react";
import Link from "next/link";

const VAZIO = { nome: "", categoria: "", tipo: "", descricao: "", link: "" };

// Formulário compartilhado pelo cadastro e pela edição.
export default function FormFerramenta({ valores = VAZIO, onSubmit, textoBotao }) {
  const [form, setForm] = useState({ ...VAZIO, ...valores });
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  function alterar(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function enviar(event) {
    event.preventDefault();
    setErro("");
    setSalvando(true);
    try {
      await onSubmit(form);
    } catch (error) {
      setErro(error instanceof TypeError
        ? "Não foi possível conectar à API em localhost:3001. Inicie o back-end com npm run dev na pasta backend."
        : error.message || "Não foi possível salvar a ferramenta.");
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
          <label className="form-label" htmlFor="descricao">Descrição</label>
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
