"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUsuario, extrairDados } from "@/services/api";
import { salvarUsuario } from "@/services/auth";
import "../auth.css";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  function alterar(event) { setForm((atual) => ({ ...atual, [event.target.name]: event.target.value })); }

  async function entrar(event) {
    event.preventDefault(); setErro(""); setEnviando(true);
    try {
      const resposta = await loginUsuario(form);
      const usuario = extrairDados(resposta)?.usuario || extrairDados(resposta);
      if (usuario?.id == null || !usuario.nome || !usuario.email) throw new Error("A API não retornou os dados esperados do usuário.");
      salvarUsuario({ id: usuario.id, nome: usuario.nome, email: usuario.email });
      router.replace("/");
    } catch (error) { setErro(error.message || "Não foi possível entrar."); setEnviando(false); }
  }

  return <section className="auth-wrap"><div className="surface-panel auth-panel"><div className="page-heading"><p className="eyebrow">BEM-VINDO DE VOLTA</p><h1>Entrar na sua conta</h1><p>Acesse para compartilhar e organizar ferramentas.</p></div><form className="auth-form" onSubmit={entrar}><label>E-mail<input name="email" type="email" autoComplete="email" value={form.email} onChange={alterar} required placeholder="voce@exemplo.com" /></label><label>Senha<input name="senha" type="password" autoComplete="current-password" value={form.senha} onChange={alterar} required placeholder="Sua senha" /></label>{erro && <p className="notice notice-error" role="alert">{erro}</p>}<button className="button button-primary" type="submit" disabled={enviando}>{enviando ? "Entrando…" : "Entrar"}</button></form><p className="auth-switch">Ainda não tem conta?<Link className="text-link" href="/cadastro-usuario">Criar conta</Link></p></div></section>;
}
