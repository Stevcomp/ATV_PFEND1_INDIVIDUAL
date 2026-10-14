function normalizarFerramenta(ferramenta) {
  if (!ferramenta) return null;
  let tags = ferramenta.tags;
  if (typeof tags === 'string') {
    try { tags = JSON.parse(tags); } catch { tags = []; }
  }
  return { ...ferramenta, id: Number(ferramenta.id), usuario_id: Number(ferramenta.usuario_id), tags: Array.isArray(tags) ? tags : [] };
}

const consultaBase = `SELECT f.id, f.nome, f.categoria, f.tipo, f.licenca, f.descricao, f.tags,
  f.link, f.usuario_id, u.nome AS autor_nome
  FROM ferramentas f JOIN usuarios u ON u.id = f.usuario_id`;

export function criarFerramentaModel({ pool }) {
  async function listarTodas({ q, categoria } = {}) {
    const condicoes = [];
    const valores = [];
    if (categoria) { condicoes.push('f.categoria = ?'); valores.push(categoria); }
    if (q) {
      condicoes.push('(f.nome LIKE ? OR f.categoria LIKE ? OR f.tipo LIKE ? OR f.descricao LIKE ? OR CAST(f.tags AS CHAR) LIKE ?)');
      const termo = `%${q}%`;
      valores.push(termo, termo, termo, termo, termo);
    }
    const where = condicoes.length ? `WHERE ${condicoes.join(' AND ')}` : '';
    const [linhas] = await pool.execute(`${consultaBase} ${where} ORDER BY f.id DESC`, valores);
    return linhas.map(normalizarFerramenta);
  }

  async function buscarPorId(id) {
    const [linhas] = await pool.execute(`${consultaBase} WHERE f.id = ?`, [id]);
    return normalizarFerramenta(linhas[0]);
  }

  async function criar(ferramenta) {
    const sql = `INSERT INTO ferramentas (nome, categoria, tipo, licenca, descricao, tags, link, usuario_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const valores = [ferramenta.nome, ferramenta.categoria, ferramenta.tipo || null, ferramenta.licenca || null,
      ferramenta.descricao, JSON.stringify(ferramenta.tags), ferramenta.link, ferramenta.usuario_id];
    const [resultado] = await pool.execute(sql, valores);
    return buscarPorId(resultado.insertId);
  }

  async function atualizar(id, ferramenta) {
    const sql = `UPDATE ferramentas SET nome = ?, categoria = ?, tipo = ?, licenca = ?, descricao = ?, tags = ?, link = ? WHERE id = ?`;
    const valores = [ferramenta.nome, ferramenta.categoria, ferramenta.tipo || null, ferramenta.licenca || null,
      ferramenta.descricao, JSON.stringify(ferramenta.tags), ferramenta.link, id];
    await pool.execute(sql, valores);
    return buscarPorId(id);
  }

  async function excluir(id) {
    await pool.execute('DELETE FROM ferramentas WHERE id = ?', [id]);
  }

  return { listarTodas, buscarPorId, criar, atualizar, excluir };
}