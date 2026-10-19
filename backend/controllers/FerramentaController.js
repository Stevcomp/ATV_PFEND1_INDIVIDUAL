export function criarFerramentaController({ ferramentaService }) {
    // Cada função responde a uma operação da API e encaminha erros não tratados.
    async function listar(req, res, next) {
        try {
            const ferramentas = await ferramentaService.listar();
            res.status(200).json({ sucesso: true, dados: ferramentas });
        } catch (erro) {
            next(erro);
        }
    }

    async function buscar(req, res, next) {
        try {
            const ferramenta = await ferramentaService.buscarPorId(req.params.id);
            res.status(200).json({ sucesso: true, dados: ferramenta })
        } catch (erro) {
            if (erro instanceof TypeError) 
                return res.status(400).json({ erro: erro.message });
            if (erro.message.includes('não encontrada'))
                return res.status(404).json({ erro: erro.message });
            next(erro);
        }
    }

    async function criar(req, res, next) {
        try {
            const ferramentaNovo = await ferramentaService.criar(req.body);
            res.status(201).json({ sucesso: true, dados: ferramentaNovo });
        } catch (erro) {
            if (erro instanceof TypeError) return res.status(400).json({ sucesso: false, erro: erro.message });
            next(erro);
        }
    }

    async function atualizar(req, res, next) {
        try {
            const ferramenta = await ferramentaService.atualizar(req.params.id, req.body);
            res.status(200).json({ sucesso: true, dados: ferramenta });
        } catch (erro) {
            if (erro instanceof TypeError) return res.status(400).json({ sucesso: false, erro: erro.message });
            if (erro.message.includes('não encontrada')) return res.status(404).json({ sucesso: false, erro: erro.message });
            next(erro);
        }
    }

    async function excluir(req, res, next) {
        try {
            const ferramenta = await ferramentaService.excluir(req.params.id);
            res.status(200).json({ sucesso: true, dados: ferramenta });
        } catch (erro) {
            if (erro instanceof TypeError) return res.status(400).json({ sucesso: false, erro: erro.message });
            if (erro.message.includes('não encontrada')) return res.status(404).json({ sucesso: false, erro: erro.message });
            next(erro);
        }
    }

    return { listar, buscar, criar, atualizar, excluir }
}
