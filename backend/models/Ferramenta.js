export default class Ferramenta {
  constructor({ nome, categoria, tipo = '', licenca = '', descricao, tags = [], link }) {
    if (typeof nome !== 'string' || nome.trim() === '') throw new TypeError('Nome Ã© obrigatÃ³rio.');
    if (typeof categoria !== 'string' || categoria.trim() === '') throw new TypeError('Categoria Ã© obrigatÃ³ria.');
    if (typeof descricao !== 'string' || descricao.trim() === '') throw new TypeError('DescriÃ§Ã£o Ã© obrigatÃ³ria.');
    if (!Array.isArray(tags) || tags.some((tag) => typeof tag !== 'string')) throw new TypeError('Tags deve ser uma lista de textos.');
    try {
      const endereco = new URL(link);
      if (!['http:', 'https:'].includes(endereco.protocol)) throw new Error();
      this.link = endereco.href;
    } catch {
      throw new TypeError('Informe um link vÃ¡lido usando HTTP ou HTTPS.');
    }
    this.nome = nome.trim();
    this.categoria = categoria.trim();
    this.tipo = typeof tipo === 'string' ? tipo.trim() : '';
    this.licenca = typeof licenca === 'string' ? licenca.trim() : '';
    this.descricao = descricao.trim();
    this.tags = [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))];
  }
}