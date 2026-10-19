"use client";

import Link from "next/link";

// Mostra os dados do registro e as ações disponíveis para cada ferramenta.
export default function CardFerramenta({ ferramenta, onExcluir }) {
  return (
    <article className="card card-ferramenta h-100">
      <div className="card-body d-flex flex-column">
        <span className="badge categoria align-self-start mb-3">{ferramenta.categoria}</span>
        <h2 className="h5 card-title">{ferramenta.nome}</h2>
        {ferramenta.tipo && <p className="text-secondary small mb-2">{ferramenta.tipo}</p>}
        <p className="card-text flex-grow-1">{ferramenta.descricao}</p>
        <a className="btn btn-outline-primary mb-2" href={ferramenta.link} target="_blank" rel="noreferrer">Acessar ferramenta</a>
        <div className="d-flex gap-2">
          <Link className="btn btn-secondary flex-grow-1" href={`/ferramentas/editar/${ferramenta.id}`}>Editar</Link>
          <button className="btn btn-danger flex-grow-1" type="button" onClick={() => onExcluir(ferramenta.id)}>Excluir</button>
        </div>
      </div>
    </article>
  );
}
