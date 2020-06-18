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

module.exports = router;
