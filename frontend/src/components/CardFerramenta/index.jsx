"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { lerUsuario } from "@/services/auth";
import "./CardFerramenta.css";

function linkExterno(valor) {
  const markdown = typeof valor === "string" ? valor.match(/^\[[^\]]*\]\((https?:\/\/[^\s)]+)\)$/) : null;
  return markdown ? markdown[1] : valor;
}

export default function CardFerramenta({ ferramenta, onExcluir }) {
  const [usuario, setUsuario] = useState(null);
  const id = ferramenta.id ?? ferramenta._id;
  const url = linkExterno(ferramenta.link || ferramenta.url);

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

  const ehAutor = usuario?.id === ferramenta.usuario_id;

  return (
    <article className="tool-card">
      <div className="tool-card-top"><span className="tool-category">{ferramenta.categoria || "Sem categoria"}</span></div>
      <div className="tool-card-title"><div><h2>{ferramenta.nome}</h2>{ferramenta.tipo && <span className="tool-type">{ferramenta.tipo}</span>}</div><span className="tool-icon" aria-hidden="true">↗</span></div>
      <p className="tool-description">{ferramenta.descricao}</p>
      <div className="tool-card-bottom"><span className="tool-author">Por {ferramenta.autor_nome || "Comunidade"}</span><div className="tool-actions">
        {url && <a className="button button-primary access-button" href={url} target="_blank" rel="noopener noreferrer">Acessar ferramenta ↗</a>}
        {ehAutor && <><Link className="button button-secondary" href={`/ferramentas/editar/${id}`}>Editar</Link><button className="button button-danger" type="button" onClick={() => onExcluir?.(id)}>Excluir</button></>}
      </div></div>
    </article>
  );
}
