// Valida e normaliza os campos antes de uma ferramenta entrar no model.
export default class Ferramenta {
  constructor({ id, nome, categoria, tipo = "", descricao, link }) {
    // Valida o ID somente quando ele foi informado (como em caso de atualização); na criação, o model ainda não recebe um ID.
    if (id !== undefined && (!Number.isInteger(id) || id <= 0)) {
      throw new TypeError("ID deve ser um inteiro positivo.");
    }
    if (typeof nome !== "string" || nome.trim() === "") {
      throw new TypeError("Nome é obrigatório.");
    }
    if (nome.trim().length > 120) {
      throw new TypeError("Nome deve ter no máximo 120 caracteres.");
    }
    if (typeof categoria !== "string" || categoria.trim() === "") {
      throw new TypeError("Categoria é obrigatória.");
    }
    if (categoria.trim().length > 80) {
      throw new TypeError("Categoria deve ter no máximo 80 caracteres.");
    }
    if (typeof tipo !== "string" || tipo.length > 80) {
      throw new TypeError("Tipo deve ser um texto de até 80 caracteres.");
    }
    if (typeof descricao !== "string" || descricao.trim() === "") {
      throw new TypeError("Descrição é obrigatória.");
    }
    if (descricao.trim().length > 1000) {
      throw new TypeError("Descrição deve ter no máximo 1000 caracteres.");
    }
    if (typeof link !== "string" || link.trim() === "") {
      throw new TypeError("Link é obrigatório.");
    }
    try {
      // Só aceitamos links web, evitando protocolos como javascript:.
      const url = new URL(link.trim());
      if (!["http:", "https:"].includes(url.protocol)) throw new Error();
    } catch {
      throw new TypeError("Link deve ser uma URL válida iniciada por http ou https.");
    }

    // Inclui o ID no objeto apenas quando ele foi informado, como em uma atualização.
    if (id !== undefined) this.id = id;
    this.nome = nome.trim();
    this.categoria = categoria.trim();
    this.tipo = tipo.trim();
    this.descricao = descricao.trim();
    this.link = link.trim();
  }
}
