export function criarFerramentaModel({ pool }) {
    const colunas = "id, nome, categoria, tipo, descricao, link, usuario_id";

    async function listarTodos() {
        const [linhas] = await pool.query(`SELECT ${colunas} FROM ferramentas`);
        return linhas;
    }

    async function buscarPorId(id) {
        const [linhas] = await pool.query(
            `SELECT ${colunas} FROM ferramentas WHERE id = ?`,
            [id]
        );
        return linhas[0] ?? null;
    }

    async function criar(ferramenta) {
        const sql = `INSERT INTO ferramentas (nome, categoria, tipo, descricao, link, usuario_id) VALUES (?, ?, ?, ?, ?, ?)`;
        const valores = [ferramenta.nome, ferramenta.categoria, ferramenta.tipo, ferramenta.descricao, ferramenta.link, ferramenta.usuario_id];
        const [resultado] = await pool.query(sql, valores);
        return { ...ferramenta, id: resultado.insertId };
    }

    return { listarTodos, buscarPorId, criar };
}
