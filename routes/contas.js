const express = require("express");
const router = express.Router();
const fs = require("fs");

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

        res.json({ mensagem: "Conta salva com sucesso." });
    } catch (err) {
        res.status(400).json({ mensagem: "Erro ao salvar conta.", erro: err });
    }
});

router.get("/", (_req, res) => {
    try {
        let json = lerArquivo();
        delete json.nextId;

        res.json(json);
    } catch (err) {
        res.status(400).json({ mensagem: "Erro ao ler arquivo.", erro: err });
    }
});

router.get("/:id", (req, res) => {
    try {
        const { id } = req.params;

        const conta = procurarContaId(parseInt(id));

        res.json(conta);
    } catch (err) {
        res.status(400).json({ mensagem: "Erro ao ler arquivo.", erro: err });
    }
});

router.delete("/:id", (req, res) => {
    try {
        const { id } = req.params;

        removerContaArquivo(id);

        res.json({ mensagem: "Conta removida com sucesso." });
    } catch (err) {
        res.status(400).json({ mensagem: "Erro ao remover conta.", erro: err });
    }
});

router.put("/", (req, res) => {
    try {
        const body = req.body;

        let json = lerArquivo();

        const index = procurarContaIndex(body.id);

        json.contas[index] = body;

        adicionarContaArquivo(json);

        res.json({ mensagem: "Conta atualizada com sucesso." });
    } catch (err) {
        res.status(400).json({
            mensagem: "Erro ao atualizar conta.",
            erro: err,
        });
    }
});

router.put("/deposito", (req, res) => {
    try {
        const body = req.body;

        let json = lerArquivo();
        const index = procurarContaIndex(body.id);

        if (body.saldo <= 0) {
            throw "Valor inválido para depósito.";
        }

        json.contas[index].saldo += body.saldo;

        adicionarContaArquivo(json);

        res.json({ mensagem: "Saldo atualizado com sucesso!" });
    } catch (err) {
        res.status(400).json({
            mensagem: "Erro ao atualizar saldo.",
            erro: err,
        });
    }
});

router.put("/saque", (req, res) => {
    try {
        const body = req.body;

        let json = lerArquivo();
        const index = procurarContaIndex(body.id);

        if (body.valor <= 0 || json.contas[index].saldo <= body.valor) {
            throw "Saldo insuficiente.";
        }

        json.contas[index].saldo -= body.valor;

        adicionarContaArquivo(json);

        res.json({ mensagem: "Saldo atualizado com sucesso!" });
    } catch (err) {
        res.status(400).json({
            mensagem: "Erro ao atualizar saldo.",
            erro: err,
        });
    }
});

module.exports = router;
