const express = require("express");
const winston = require("winston");

const rotasContas = require("./routes/contas");
const { criarArquivo } = require("./src/utils/file");

const app = express();
const port = 3000;

global.fileName = "contas.json";

const { combine, timestamp, label, printf } = winston.format;
const formatoLogger = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "my-bank-api.log" }),
    ],
    format: combine(
        label({ label: "my-bank-api" }),
        timestamp(),
        formatoLogger
    ),
});

app.use(express.json());
app.use("/conta", rotasContas);

app.listen(port, () => {
    try {
        criarArquivo();
        logger.info(`App start [Porta ${port}]`);
    } catch (err) {
        logger.error(`Erro ao iniciar app: ${err}`);
    }
});
