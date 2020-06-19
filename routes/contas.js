const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post("/", (req, res) => {
    fs.readFile(file, "utf8", (err, data) => {
        if (!err) {
            try {
                let json = JSON.parse(data);
                const conta = { id: json.nextId++, ...req.body };

                json.contas.push(conta);

                fs.writeFile(file, JSON.stringify(json), (err) => {
                    if (err) {
                        res.status(400).json({ mensagem: err.message });
                    }
                });

                res.json({ mensagem: "Conta salva com sucesso." });
            } catch (err) {
                res.status(400).json({ mensagem: err.message });
            }
        }
    });
});

router.get("/", (_req, res) => {
    fs.readFile(file, "utf8", (err, data) => {
        if (err) {
            res.status(400).json({ mensagem: "Erro ao ler arquivo." });
        }

        let json = JSON.parse(data);
        delete json.nextId;

        res.json(json);
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;

    fs.readFile(file, "utf8", (err, data) => {
        if (err) {
            res.status(400).json({ mensagem: "Erro ao ler arquivo." });
        }

        const json = JSON.parse(data);
        const conta = json.contas.find((item) => item.id === parseInt(id));

        if (!conta) {
            res.status(404).json({ mensagem: "Conta não encontrada." });
        }

        res.json(conta);
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    fs.readFile(file, "utf8", (err, data) => {
        if (err) {
            res.status(400).json({ mensagem: "Erro ao ler arquivo." });
        }

        let json = JSON.parse(data);
        const contas = json.contas.filter((item) => item.id !== parseInt(id));

        json.contas = contas;

        fs.writeFile(file, JSON.stringify(json), (err) => {
            if (err) {
                res.status(400).json({ mensagem: err.message });
            }
        });

        res.json({ mensagem: "Conta removida com sucesso." });
    });
});

router.put("/", (req, res) => {
    const body = req.body;

    fs.readFile(file, "utf8", (err, data) => {
        if (err) {
            res.status(400).json({ mensagem: "Erro ao ler arquivo." });
        }

        let json = JSON.parse(data);

        const index = json.contas.findIndex(
            (item) => item.id === parseInt(body.id)
        );

        if (!index) {
            res.status(404).json({ mensagem: "Conta não encontrada." });
        }

        json.contas[index] = body;

        fs.writeFile(file, JSON.stringify(json), (err) => {
            if (err) {
                res.status(400).json({ mensagem: err.message });
            }
        });

        res.json({ mensagem: "Conta atualizada com sucesso!" });
    });
});

router.put("/deposito", (req, res) => {
    const body = req.body;

    fs.readFile(file, "utf8", (err, data) => {
        if (err) {
            res.status(400).json({ mensagem: "Erro ao ler arquivo." });
        }

        let json = JSON.parse(data);

        const index = json.contas.findIndex(
            (item) => item.id === parseInt(body.id)
        );

        if (!index) {
            res.status(404).json({ mensagem: "Conta não encontrada." });
        }

        if (body.saldo <= 0) {
            res.status(400).json({ mensagem: "Valor inválido para depósito." });
        }

        json.contas[index].saldo += body.saldo;

        fs.writeFile(file, JSON.stringify(json), (err) => {
            if (err) {
                res.status(400).json({ mensagem: err.message });
            }
        });

        res.json({ mensagem: "Saldo atualizado com sucesso!" });
    });
});

module.exports = router;
