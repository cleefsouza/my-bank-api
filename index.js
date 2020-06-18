const express = require("express");
const fs = require("fs");

const app = express();
const port = 3001;

app.use(express.json());

app.post("/conta", (req, res) => {
    fs.readFile("contas.json", "utf8", (err, data) => {
        if (!err) {
            try {
                let json = JSON.parse(data);

                const conta = { id: json.nextId++, ...req.body };

                json.contas.push(conta);

                fs.writeFile("contas.json", JSON.stringify(json), (err) => {
                    if (err) {
                        console.log(`Erro ao salvar conta: ${err}`);
                    }
                });

                res.json({ mesagem: "Conta salva com sucesso." });
            } catch (err) {
                console.log(`Erro ao ler arquivo: ${err}`);
                res.status(400).json({ mesagem: "Erro ao ler arquivo." });
            }
        }
    });
});

app.listen(port, () => {
    try {
        fs.readFile("contas.json", "utf8", (err) => {
            if (err) {
                const initialJson = {
                    nextId: 1,
                    contas: [],
                };

                fs.writeFile(
                    "contas.json",
                    JSON.stringify(initialJson),
                    (err) => {
                        if (err) {
                            console.log(`Erro ao criar arquivo: ${err}`);
                            return;
                        }

                        console.log("Arquivo criado com sucesso.");
                    }
                );
            }
        });

        console.log(`App start [Porta ${port}]`);
    } catch (err) {
        console.log(`Erro ao iniciar app: ${err}`);
    }
});
