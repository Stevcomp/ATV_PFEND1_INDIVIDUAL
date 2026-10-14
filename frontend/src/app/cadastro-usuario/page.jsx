"use client";

import { useState } from "react";
import Link from "next/link";
import { cadastrarUsuario } from "@/services/api";
import "../auth.css";

export default function CadastroUsuarioPage() {
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [enviando, setEnviando] = useState(false);

  function alterar(event) { setForm((atual) => ({ ...atual, [event.target.name]: event.target.value })); }

  async function cadastrar(event) {
    event.preventDefault(); setErro(""); setEnviando(true);
    try { await cadastrarUsuario(form); setSucesso(true); }
    catch (error) { setErro(error.message || "Não foi possível criar sua conta."); setEnviando(false); }
  }

  return <section className="auth-wrap"><div className="surface-panel auth-panel"><div className="page-heading"><p className="eyebrow">FAÇA PARTE DA COMUNIDADE</p><h1>Criar sua conta</h1><p>Compartilhe recursos e ajude outros desenvolvedores.</p></div>{sucesso ? <div className="notice notice-success" role="status">Conta criada com sucesso. <Link className="text-link" href="/login">Entre para continuar.</Link></div> : <form className="auth-form" onSubmit={cadastrar}><label>Nome<input name="nome" autoComplete="name" value={form.nome} onChange={alterar} required minLength={2} maxLength={100} placeholder="Seu nome" /></label><label>E-mail<input name="email" type="email" autoComplete="email" value={form.email} onChange={alterar} required placeholder="voce@exemplo.com" /></label><label>Senha<input name="senha" type="password" autoComplete="new-password" value={form.senha} onChange={alterar} required minLength={6} placeholder="Pelo menos 6 caracteres" /></label>{erro && <p className="notice notice-error" role="alert">{erro}</p>}<button className="button button-primary" type="submit" disabled={enviando}>{enviando ? "Criando conta…" : "Criar conta"}</button></form>}<p className="auth-switch">Já tem uma conta?<Link className="text-link" href="/login">Entrar</Link></p></div></section>;
}
