const express = require("express");
const fs = require("fs");
const rotasContas = require('./routes/contas.js');

const app = express();
const port = 3000;

global.file = "contas.json";

app.use(express.json());
app.use("/conta", rotasContas);

app.listen(port, () => {
    try {
        fs.readFile(file, "utf8", (err) => {
            if (err) {
                const initialJson = {
                    nextId: 1,
                    contas: [],
                };

                fs.writeFile(file, JSON.stringify(initialJson), (err) => {
                    if (err) {
                        console.log(`Erro ao criar arquivo: ${err}`);
                        return;
                    }

                    console.log("Arquivo criado com sucesso.");
                });
            }
        });

        console.log(`App start [Porta ${port}]`);
    } catch (err) {
        console.log(`Erro ao iniciar app: ${err}`);
    }
});
