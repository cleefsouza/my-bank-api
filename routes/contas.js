const express = require("express");
const router = express.Router();

const {
    lerArquivo,
    adicionarContaArquivo,
    removerContaArquivo,
    procurarContaId,
    procurarContaIndex,
} = require("../src/utils/file");

router.post("/", (req, res) => {
    try {
        let json = lerArquivo();

        const conta = { id: json.nextId++, ...req.body };
        json.contas.push(conta);

        adicionarContaArquivo(json);

        res.json({ mensagem: "Conta salva com sucesso" });
        logger.info(
            `[${req.method}] Conta salva com sucesso [Id: ${conta.id}].`
        );
    } catch (err) {
        res.status(400).json({ mensagem: "Erro ao salvar conta", erro: err });
        logger.error(`[${req.method}] Erro ao salvar conta: ${err}`);
    }
});

router.get("/", (req, res) => {
    try {
        let json = lerArquivo();
        delete json.nextId;

        res.json(json);
        logger.info(
            `[${req.method}] Listando contas [Total: ${json.contas.length}].`
        );
    } catch (err) {
        res.status(400).json({ mensagem: "Erro ao ler arquivo", erro: err });
        logger.error(`[${req.method}] Erro ao ler arquivo: ${err}`);
    }
});

router.get("/:id", (req, res) => {
    try {
        const { id } = req.params;

        const conta = procurarContaId(parseInt(id));

        res.json(conta);
        logger.info(`[${req.method}] Buscando conta [Id: ${conta.id}].`);
    } catch (err) {
        res.status(400).json({ mensagem: "Erro ao ler arquivo", erro: err });
        logger.error(`[${req.method}] Erro ao ler arquivo: ${err}`);
    }
});

router.delete("/:id", (req, res) => {
    try {
        const { id } = req.params;

        removerContaArquivo(id);

        res.json({ mensagem: "Conta removida com sucesso" });
        logger.info(`[${req.method}] Conta removida [Id: ${id}].`);
    } catch (err) {
        res.status(400).json({ mensagem: "Erro ao remover conta", erro: err });
        logger.error(`[${req.method}] Erro ao remover conta: ${err}`);
    }
});

router.put("/", (req, res) => {
    try {
        const body = req.body;

        let json = lerArquivo();

        const index = procurarContaIndex(body.id);

        json.contas[index] = body;

        adicionarContaArquivo(json);

        res.json({ mensagem: "Conta atualizada com sucesso" });
        logger.info(`[${req.method}] Conta atualizada [Id: ${body.id}].`);
    } catch (err) {
        res.status(400).json({
            mensagem: "Erro ao atualizar conta",
            erro: err,
        });

        logger.error(`[${req.method}] Erro ao atualizar conta: ${err}`);
    }
});

router.put("/deposito", (req, res) => {
    try {
        const body = req.body;

        let json = lerArquivo();
        const index = procurarContaIndex(body.id);

        if (body.valor <= 0) {
            throw "Valor inválido para depósito";
        }

        json.contas[index].saldo += body.valor;

        adicionarContaArquivo(json);

        res.json({ mensagem: "Saldo atualizado com sucesso!" });
        logger.info(
            `[${req.method}] Depósito realizado [Id ${body.id}, Valor: R$ ${body.valor}].`
        );
    } catch (err) {
        res.status(400).json({
            mensagem: "Erro ao atualizar saldo",
            erro: err,
        });

        logger.error(`[${req.method}] Erro ao atualizar saldo: ${err}`);
    }
});

router.put("/saque", (req, res) => {
    try {
        const body = req.body;

        let json = lerArquivo();
        const index = procurarContaIndex(body.id);

        if (body.valor <= 0 || json.contas[index].saldo <= body.valor) {
            throw "Saldo insuficiente";
        }

        json.contas[index].saldo -= body.valor;

        adicionarContaArquivo(json);

        res.json({ mensagem: "Saldo atualizado com sucesso!" });
        logger.info(
            `[${req.method}] Saque realizado [Id: ${body.id}, Valor: ${body.valor}].`
        );
    } catch (err) {
        res.status(400).json({
            mensagem: "Erro ao atualizar saldo",
            erro: err,
        });

        logger.error(`[${req.method}] Erro ao atualizar saldo: ${err}`);
    }
});

module.exports = router;
