"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FormFerramenta from "@/components/FormFerramenta";
import { API_FERRAMENTAS, chamarApi } from "@/components/FormFerramenta";

export default function EditarFerramentaPage() {
  // Obtém da URL o ID da ferramenta que será carregada e editada.
  const { id } = useParams();
  const router = useRouter();
  // Guarda a ferramenta carregada e o estado da tela durante a busca.
  const [ferramenta, setFerramenta] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Busca os dados da ferramenta sempre que o ID da rota mudar.
  useEffect(() => {
    async function carregarFerramenta() {
      try {
        const resultado = await chamarApi(`${API_FERRAMENTAS}/${id}`);
        setFerramenta(resultado.dados);
      } catch (error) {
        setErro(error.status === 404
          ? "Esta ferramenta não está na API atual. Os registros ficam em memória e são apagados quando o back-end reinicia. Volte ao catálogo e cadastre novamente."
          : error instanceof TypeError
            ? "Não foi possível conectar à API em localhost:3001. Inicie o back-end com npm run dev na pasta backend."
            : error.message || "Não foi possível conectar à API.");
      } finally {
        setCarregando(false);
      }
    }

    carregarFerramenta();
  }, [id]);

  // Envia as alterações à API e volta ao catálogo após salvar.
  async function salvar(dados) {
    await chamarApi(`${API_FERRAMENTAS}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    router.push("/?mensagem=atualizada");
  }

  // Exibe carregamento, erros ou o formulário preenchido para edição.
  return (
    <div className="container py-4">
      <div className="card form-card">
        <div className="card-body p-4">
          <h1 className="h2 mb-2">Editar ferramenta</h1>
          <p className="text-secondary mb-4">Atualize os dados deste registro.</p>
          {carregando && <p role="status">Carregando ferramenta...</p>}
          {erro && <div className="alert alert-danger" role="alert">{erro}</div>}
          {ferramenta && <FormFerramenta key={ferramenta.id} valores={ferramenta} onSubmit={salvar} textoBotao="Salvar alterações" />}
          {!carregando && erro && <a className="btn btn-outline-secondary mt-3" href="/">Voltar ao catálogo</a>}
        </div>
      </div>
    </div>
  );
}
