"use client";

import { useState } from "react";
import Link from "next/link";
import "./FormFerramenta.css";

const INICIAL = { nome: "", categoria: "", tipo: "", licenca: "", descricao: "", tags: "", link: "" };

function paraFormulario(ferramenta) {
  return { ...INICIAL, ...ferramenta, tags: Array.isArray(ferramenta?.tags) ? ferramenta.tags.join(", ") : ferramenta?.tags || "" };
}

export default function FormFerramenta({ valores = INICIAL, onSubmit, textoBotao = "Salvar ferramenta" }) {
  const [form, setForm] = useState(() => paraFormulario(valores));
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  function alterar(event) { setForm((atual) => ({ ...atual, [event.target.name]: event.target.value })); }

  async function enviar(event) {
    event.preventDefault();
    setErro("");
    setSalvando(true);
    const dados = { ...form, tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean) };
    try { await onSubmit(dados); }
    catch (error) { setErro(error.message || "Não foi possível salvar a ferramenta."); setSalvando(false); }
  }

  return (
    <form className="tool-form" onSubmit={enviar}>
      <div className="form-grid">
        <label>Nome da ferramenta<input name="nome" value={form.nome} onChange={alterar} maxLength={120} required placeholder="Ex.: Hoppscotch" /></label>
        <label>Categoria<input name="categoria" value={form.categoria} onChange={alterar} maxLength={80} required placeholder="Ex.: API & Backend" /></label>
        <label>Tipo<input name="tipo" value={form.tipo} onChange={alterar} maxLength={80} placeholder="Ex.: API Client" /></label>
        <label>Licença<input name="licenca" value={form.licenca} onChange={alterar} maxLength={80} placeholder="Ex.: Open Source" /></label>
        <label className="form-wide">Link da ferramenta<input name="link" type="url" value={form.link} onChange={alterar} required placeholder="https://exemplo.com" /></label>
        <label className="form-wide">Descrição<textarea name="descricao" value={form.descricao} onChange={alterar} rows={5} maxLength={1000} required placeholder="Descreva o que a ferramenta faz." /></label>
        <label className="form-wide">Tags <span className="form-hint">separadas por vírgula</span><input name="tags" value={form.tags} onChange={alterar} placeholder="API, REST, produtividade" /></label>
      </div>
      {erro && <p className="notice notice-error" role="alert">{erro}</p>}
      <div className="form-actions"><button className="button button-primary" type="submit" disabled={salvando}>{salvando ? "Salvando…" : textoBotao}</button><Link className="button button-secondary" href="/">Cancelar</Link></div>
    </form>
  );
}
