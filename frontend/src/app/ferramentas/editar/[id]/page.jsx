"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FormFerramenta from "@/components/FormFerramenta";
import { atualizarFerramenta, buscarFerramenta, extrairDados } from "@/services/api";
import { lerUsuario } from "@/services/auth";

export default function EditarFerramentaPage() {
  const { id } = useParams();
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [ferramenta, setFerramenta] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const atual = lerUsuario();
    if (!atual) { router.replace("/login"); setCarregando(false); return; }
    setUsuario(atual);
    buscarFerramenta(id)
      .then((resposta) => {
        const item = extrairDados(resposta);
        if (item?.usuario_id !== atual.id) {
          setErro("Você não tem permissão para editar esta ferramenta.");
          return;
        }
        setFerramenta(item);
      })
      .catch((error) => setErro(error.message || "Não foi possível carregar a ferramenta."))
      .finally(() => setCarregando(false));
  }, [id, router]);

  async function salvar(dados) {
    await atualizarFerramenta(id, { ...dados, usuario_id: ferramenta.usuario_id, autor_nome: ferramenta.autor_nome || usuario.nome });
    router.push("/");
    router.refresh();
  }

  if (carregando) return <p role="status">Carregando ferramenta…</p>;
  if (erro) return <section className="surface-panel edit-message"><p className="notice notice-error" role="alert">{erro}</p><a className="text-link" href="/">Voltar ao catálogo →</a><style jsx>{`.edit-message{max-width:700px;margin:0 auto}.edit-message .text-link{display:inline-block;margin-top:18px}`}</style></section>;
  if (!ferramenta) return null;

  return <section className="surface-panel tool-form-panel"><div className="page-heading"><p className="eyebrow">SUA CONTRIBUIÇÃO</p><h1>Editar ferramenta</h1><p>Atualize as informações deste recurso.</p></div><FormFerramenta valores={ferramenta} onSubmit={salvar} textoBotao="Salvar alterações" /><style jsx>{`.tool-form-panel{max-width:760px;margin:0 auto}`}</style></section>;
}
