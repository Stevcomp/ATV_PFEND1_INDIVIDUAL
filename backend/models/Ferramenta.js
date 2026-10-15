export default class Ferramenta {
  constructor({ id, nome, categoria, tipo = "", descricao, link, usuario_id }) {
    if (id !== undefined && (!Number.isInteger(id) || id <= 0)) {
      throw new TypeError("ID deve ser um inteiro positivo.");
    }
    if (typeof nome !== "string" || nome.trim() === "") {
      throw new TypeError("Nome é obrigatório.");
    }
    if (typeof categoria !== "string" || categoria.trim() === "") {
      throw new TypeError("Categoria é obrigatória.");
    }
    if (typeof tipo !== "string") {
      throw new TypeError("Tipo deve ser um texto.");
    }
    if (typeof descricao !== "string" || descricao.trim() === "") {
      throw new TypeError("Descrição é obrigatória.");
    }
    if (descricao.length > 1000) {
      throw new TypeError("Descrição deve ter no máximo 1000 caracteres.");
    }
    if (typeof link !== "string" || link.trim() === "") {
      throw new TypeError("Link é obrigatório.");
    }
    try {
      const url = new URL(link.trim());
      if (!["http:", "https:"].includes(url.protocol)) throw new Error();
    } catch {
      throw new TypeError("Link deve ser uma URL válida iniciada por http ou https.");
    }
    if (!Number.isInteger(usuario_id) || usuario_id <= 0) {
      throw new TypeError("ID do usuário deve ser um inteiro positivo.");
    }

    if (id !== undefined) this.id = id;
    this.nome = nome.trim();
    this.categoria = categoria.trim();
    this.tipo = tipo.trim();
    this.descricao = descricao.trim();
    this.link = link.trim();
    this.usuario_id = usuario_id;
  }
}