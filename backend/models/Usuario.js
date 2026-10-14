export default class Usuario {
  constructor({ nome, email, senha }) {
    if (typeof nome !== 'string' || nome.trim().length < 2) {
      throw new TypeError('Nome deve ter pelo menos 2 caracteres.');
    }
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      throw new TypeError('Informe um e-mail vÃ¡lido.');
    }
    if (typeof senha !== 'string' || senha.length < 6) {
      throw new TypeError('A senha deve ter pelo menos 6 caracteres.');
    }
    this.nome = nome.trim();
    this.email = email.trim().toLowerCase();
    this.senha = senha;
  }
}