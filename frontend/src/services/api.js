

const API_BASE = "http://localhost:3001/api";

async function requisicao(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  const raw = await response.text();
  let body = null;
  if (raw) {
    try { body = JSON.parse(raw); } catch { body = { mensagem: raw }; }
  }

  if (!response.ok) {
    throw new Error(body?.erro || body?.mensagem || body?.message || `Erro na API (${response.status}).`);
  }
  return body;
}

export const listarFerramentas = () => requisicao("/ferramentas");
export const buscarFerramenta = (id) => requisicao(`/ferramentas/${encodeURIComponent(id)}`);
export const criarFerramenta = (dados) => requisicao("/ferramentas", { method: "POST", body: JSON.stringify(dados) });
export const atualizarFerramenta = (id, dados) => requisicao(`/ferramentas/${encodeURIComponent(id)}`, { method: "PUT", body: JSON.stringify(dados) });
export const excluirFerramenta = (id) => requisicao(`/ferramentas/${encodeURIComponent(id)}`, { method: "DELETE" });
export const loginUsuario = (dados) => requisicao("/usuarios/login", { method: "POST", body: JSON.stringify(dados) });
export const cadastrarUsuario = (dados) => requisicao("/usuarios", { method: "POST", body: JSON.stringify(dados) });

export function extrairDados(resposta) {
  return resposta?.dados ?? resposta?.data ?? resposta?.ferramenta ?? resposta?.usuario ?? resposta;
}

export function extrairLista(resposta) {
  const dados = extrairDados(resposta);
  return Array.isArray(dados) ? dados : [];
}
