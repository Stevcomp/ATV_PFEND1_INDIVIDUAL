"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormFerramenta from "@/components/FormFerramenta";
import { criarFerramenta } from "@/services/api";
import { lerUsuario } from "@/services/auth";

export default function NovaFerramentaPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    const atual = lerUsuario();
    if (!atual) router.replace("/login");
    else setUsuario(atual);
    setVerificando(false);
  }, [router]);

  async function salvar(dados) {
    await criarFerramenta({ ...dados, usuario_id: usuario.id, autor_nome: usuario.nome });
    router.push("/");
    router.refresh();
  }

  if (verificando || !usuario) return <p role="status">Verificando acesso…</p>;

  return <section className="surface-panel tool-form-panel"><div className="page-heading"><p className="eyebrow">CONTRIBUA COM A COMUNIDADE</p><h1>Cadastrar ferramenta</h1><p>Compartilhe um recurso útil com outros desenvolvedores.</p></div><FormFerramenta onSubmit={salvar} textoBotao="Publicar ferramenta" /><style jsx>{`.tool-form-panel{max-width:760px;margin:0 auto}`}</style></section>;
}
