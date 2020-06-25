const express = require("express");

const rotasContas = require("./routes/contas");
const { criarArquivo } = require("./src/utils/file");

const app = express();
const port = 3000;

global.fileName = "contas.json";

app.use(express.json());
app.use("/conta", rotasContas);

app.listen(port, () => {
    try {
        criarArquivo();
        console.log(`App start [Porta ${port}]`);
    } catch (err) {
        console.log(`Erro ao iniciar app: ${err}`);
    }
});
