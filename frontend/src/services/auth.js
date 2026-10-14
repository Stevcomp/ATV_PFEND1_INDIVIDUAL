export const CHAVE_USUARIO = "devresources_usuario";

export function lerUsuario() {
  if (typeof window === "undefined") return null;
  try {
    const usuario = JSON.parse(window.localStorage.getItem(CHAVE_USUARIO) || "null");
    return usuario && usuario.id != null ? usuario : null;
  } catch {
    return null;
  }
}

export function salvarUsuario(usuario) {
  window.localStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario));
  window.dispatchEvent(new Event("devresources-auth-change"));
}

export function limparUsuario() {
  window.localStorage.removeItem(CHAVE_USUARIO);
  window.dispatchEvent(new Event("devresources-auth-change"));
}
