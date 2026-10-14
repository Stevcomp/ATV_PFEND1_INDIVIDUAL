export function criarUsuarioModel({ pool }) {
  async function listarPorEmail(email) {
    const [linhas] = await pool.execute('SELECT id, nome, email, senha_hash FROM usuarios WHERE email = ?', [email]);
    return linhas[0] || null;
  }

  async function buscarPorId(id) {
    const [linhas] = await pool.execute('SELECT id, nome, email FROM usuarios WHERE id = ?', [id]);
    if (linhas.length === 0) return null;
    return { ...linhas[0], id: Number(linhas[0].id) };
  }

  async function criar(usuario) {
    const [resultado] = await pool.execute(
      'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)',
      [usuario.nome, usuario.email, usuario.senhaHash],
    );
    return { id: Number(resultado.insertId), nome: usuario.nome, email: usuario.email };
  }

  return { listarPorEmail, buscarPorId, criar };
}