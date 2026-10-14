"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CardFerramenta from "@/components/CardFerramenta";
import { excluirFerramenta, listarFerramentas, extrairLista } from "@/services/api";
import { lerUsuario } from "@/services/auth";

export default function HomePage() {
  const [ferramentas, setFerramentas] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const atualizarUsuario = () => setUsuario(lerUsuario());
    atualizarUsuario();
    window.addEventListener("storage", atualizarUsuario);
    window.addEventListener("devresources-auth-change", atualizarUsuario);
    return () => {
      window.removeEventListener("storage", atualizarUsuario);
      window.removeEventListener("devresources-auth-change", atualizarUsuario);
    };
  }, []);

  useEffect(() => {
    listarFerramentas()
      .then((resposta) => setFerramentas(extrairLista(resposta)))
      .catch((error) => setErro(error.message || "Não foi possível carregar as ferramentas."))
      .finally(() => setCarregando(false));
  }, []);

  const categorias = useMemo(() => ["Todas", ...new Set(ferramentas.map((f) => f.categoria).filter(Boolean).sort((a, b) => a.localeCompare(b)))], [ferramentas]);
  const filtradas = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");
    return ferramentas.filter((f) => {
      const correspondeCategoria = categoria === "Todas" || f.categoria === categoria;
      const texto = [f.nome, f.categoria, f.tipo, f.descricao, f.autor_nome, ...(f.tags || [])].filter(Boolean).join(" ").toLocaleLowerCase("pt-BR");
      return correspondeCategoria && (!termo || texto.includes(termo));
    });
  }, [busca, categoria, ferramentas]);

  async function excluir(id) {
    if (!window.confirm("Tem certeza de que deseja excluir esta ferramenta?")) return;
    setErro("");
    try {
      await excluirFerramenta(id);
      setFerramentas((atual) => atual.filter((f) => (f.id ?? f._id) !== id));
    } catch (error) { setErro(error.message || "Não foi possível excluir a ferramenta."); }
  }

  return (
    <>
      <section className="home-heading">
        <div><p className="eyebrow">SUA CAIXA DE FERRAMENTAS PARA DEV</p><h1>Descubra ferramentas que <span>aceleram seu código.</span></h1><p className="home-intro">Uma coleção colaborativa de recursos úteis para quem constrói na web.</p></div>
        <Link className="button button-primary add-tool" href={usuario ? "/ferramentas/nova" : "/login"}>＋ Cadastrar ferramenta</Link>
      </section>

      <section className="catalog-controls" aria-label="Busca e filtros">
        <label className="search-box"><span aria-hidden="true">⌕</span><input type="search" value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Buscar ferramentas, categorias ou tags…" aria-label="Buscar ferramentas" /></label>
        <div className="category-filters" aria-label="Filtrar por categoria">{categorias.map((item) => <button type="button" key={item} className={`category-filter ${categoria === item ? "selected" : ""}`} onClick={() => setCategoria(item)}>{item}</button>)}</div>
      </section>

      <div className="results-heading"><h2>{busca || categoria !== "Todas" ? "Resultados" : "Explore ferramentas"}</h2><span>{carregando ? "Carregando…" : `${filtradas.length} ${filtradas.length === 1 ? "ferramenta" : "ferramentas"}`}</span></div>
      {erro && <p className="notice notice-error home-error" role="alert">{erro}</p>}
      {carregando ? <div className="empty-state">Carregando catálogo…</div> : filtradas.length ? <section className="tools-grid" aria-label="Catálogo de ferramentas">{filtradas.map((ferramenta) => <CardFerramenta key={ferramenta.id ?? ferramenta._id} ferramenta={ferramenta} onExcluir={excluir} />)}</section> : <section className="empty-state"><span className="empty-icon" aria-hidden="true">⌕</span><h2>{busca || categoria !== "Todas" ? "Nenhum resultado encontrado" : "O catálogo está começando"}</h2><p>{busca || categoria !== "Todas" ? "Tente outro termo ou categoria." : "Seja a primeira pessoa a compartilhar uma ferramenta com a comunidade."}</p>{!busca && categoria === "Todas" && <Link className="text-link" href={usuario ? "/ferramentas/nova" : "/login"}>Cadastrar a primeira ferramenta →</Link>}</section>}

      <style jsx>{`
        .home-heading{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin:8px 0 34px}.home-heading h1{max-width:700px;margin-top:12px;font-size:clamp(2rem,5vw,3.25rem);line-height:1.08;letter-spacing:-.055em}.home-heading h1 span{color:var(--primary-color)}.home-intro{margin-top:14px;color:var(--text-muted);font-size:1.02rem;line-height:1.6}.add-tool{flex:0 0 auto}.catalog-controls{display:grid;gap:18px;margin-bottom:30px}.search-box{display:flex;align-items:center;gap:11px;padding:0 15px;border:1px solid var(--border-color);border-radius:11px;background:white;color:var(--text-muted)}.search-box:focus-within{border-color:var(--primary-color);box-shadow:0 0 0 3px #2563EB1A}.search-box>span{font-size:1.5rem}.search-box input{width:100%;height:48px;border:0;outline:0;background:transparent;color:var(--text-main)}.category-filters{display:flex;flex-wrap:wrap;gap:9px}.category-filter{padding:8px 14px;border:1px solid var(--border-color);border-radius:22px;background:white;color:var(--text-muted);font-size:.86rem;font-weight:650;cursor:pointer}.category-filter:hover{border-color:var(--primary-color);color:var(--primary-color)}.category-filter.selected{border-color:var(--primary-color);background:var(--primary-color);color:white}.results-heading{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:17px}.results-heading h2{font-size:1.12rem}.results-heading span{color:var(--text-muted);font-size:.84rem}.tools-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.empty-state{padding:56px 20px;border:1px dashed var(--border-color);border-radius:14px;background:#fff;text-align:center;color:var(--text-muted);line-height:1.6}.empty-state h2{margin:10px 0 5px;color:var(--text-main);font-size:1.18rem}.empty-state p{margin-bottom:13px}.empty-icon{font-size:1.8rem;color:var(--primary-color)}.home-error{margin-bottom:18px}@media(max-width:950px){.tools-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:650px){.home-heading{align-items:flex-start;flex-direction:column}.tools-grid{grid-template-columns:1fr}.add-tool{width:100%}.category-filters{flex-wrap:nowrap;overflow-x:auto;padding-bottom:5px}.category-filter{white-space:nowrap}}
      `}</style>
    </>
  );
}
