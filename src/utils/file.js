import fs from "fs";

export const criarArquivo = () => {
    try {
        lerArquivo();
    } catch (err) {
        const initialJson = {
            nextId: 1,
            contas: [],
        };

        fs.writeFile(fileName, JSON.stringify(initialJson), (err) => {
            if (err) throw "Erro ao criar arquivo.";

            logger.info("Arquivo criado com sucesso.");
        });
    }
};

export const lerArquivo = () => {
    try {
        return JSON.parse(fs.readFileSync(fileName, "utf8"));
    } catch (err) {
        throw err;
    }
};

export const adicionarContaArquivo = (data) => {
    fs.writeFile(fileName, JSON.stringify(data), (err) => {
        if (err) throw err;
    });
};

export const removerContaArquivo = (id) => {
    try {
        let json = lerArquivo();
        const contas = json.contas.filter((item) => item.id !== parseInt(id));

        json.contas = contas;

        adicionarContaArquivo(json);
    } catch (err) {
        throw err;
    }
};

export const procurarContaId = (id) => {
    try {
        const json = lerArquivo();

        const conta = json.contas.find((item) => item.id === id);

        if (!conta) {
            throw "Conta não encontrada.";
        }

        return conta;
    } catch (err) {
        throw err;
    }
};

export const procurarContaIndex = (index) => {
    try {
        const json = lerArquivo();

        const conta = json.contas.findIndex((item) => item.id === index);

        if (conta < 0) {
            throw "Conta não encontrada.";
        }

        return conta;
    } catch (err) {
        throw err;
    }
};
