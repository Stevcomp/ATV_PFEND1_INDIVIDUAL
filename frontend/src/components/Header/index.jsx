"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { limparUsuario, lerUsuario } from "@/services/auth";
import "./Header.css";

export default function Header() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const atualizar = () => setUsuario(lerUsuario());
    atualizar();
    window.addEventListener("storage", atualizar);
    window.addEventListener("devresources-auth-change", atualizar);
    return () => {
      window.removeEventListener("storage", atualizar);
      window.removeEventListener("devresources-auth-change", atualizar);
    };
  }, []);

  function sair() {
    limparUsuario();
    window.location.assign("/");
  }

  return (
    <header className="site-header">
      <div className="header-container">
        <Link className="brand" href="/"><span className="brand-mark">&lt;/&gt;</span>DevResources<span className="brand-manager">Manager</span></Link>
        <nav className="header-nav" aria-label="Navegação principal">
          <Link href="/">Explorar</Link>
          {usuario ? <><span className="header-greeting">Olá, {usuario.nome}</span><button type="button" className="header-logout" onClick={sair}>Sair</button></> : <><Link href="/login">Entrar</Link><Link className="header-signup" href="/cadastro-usuario">Criar conta</Link></>}
        </nav>
      </div>
    </header>
  );
}
