import express from "express";
import winston from "winston";
import swaggerUi from "swagger-ui-express";

import rotasContas from "./routes/contas.js";
import swaggerDoc from "./doc.js";
import { criarArquivo } from "./src/utils/file.js";

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
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(port, () => {
    try {
        criarArquivo();
        logger.info(`App start [Porta ${port}]`);
    } catch (err) {
        logger.error(`Erro ao iniciar app: ${err}`);
    }
});
