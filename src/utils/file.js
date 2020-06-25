const fs = require("fs");

exports.criarArquivo = () => {
    try {
        this.lerArquivo();
    } catch (err) {
        const initialJson = {
            nextId: 1,
            contas: [],
        };

        fs.writeFile(global.fileName, JSON.stringify(initialJson), (err) => {
            if (err) throw "Erro ao criar arquivo.";

            console.log("Arquivo criado com sucesso.");
        });
    }
};

exports.lerArquivo = () => {
    try {
        return JSON.parse(fs.readFileSync(global.fileName, "utf8"));
    } catch (err) {
        throw err;
    }
};

exports.adicionarContaArquivo = (data) => {
    fs.writeFile(global.fileName, JSON.stringify(data), (err) => {
        if (err) throw err;
    });
};

exports.removerContaArquivo = (id) => {
    try {
        let json = this.lerArquivo();
        const contas = json.contas.filter((item) => item.id !== parseInt(id));

        json.contas = contas;

        this.adicionarContaArquivo(json);
    } catch (err) {
        throw err;
    }
};

exports.procurarContaId = (id) => {
    try {
        const json = this.lerArquivo();

        const conta = json.contas.find((item) => item.id === id);

        if (!conta) {
            throw "Conta não encontrada.";
        }

        return conta;
    } catch (err) {
        throw err;
    }
};

exports.procurarContaIndex = (index) => {
    try {
        const json = this.lerArquivo();

        const conta = json.contas.findIndex((item) => item.id === index);

        if (conta < 0) {
            throw "Conta não encontrada.";
        }

        return conta;
    } catch (err) {
        throw err;
    }
};
