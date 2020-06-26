const swaggerDoc = {
    swagger: "2.0",
    info: {
        description:
            "Simples API para simular operações bancárias | Exercício do Bootcamp Desenvolvedor FullStack da IGTI",
        version: "1.0.0",
        title: "My Bank API",
    },
    host: "localhost:3000",
    tags: [
        {
            name: "conta",
            description: "Gerenciador de contas",
        },
    ],
    schemes: ["http"],
    paths: {
        "/conta": {
            post: {
                tags: ["conta"],
                summary: "Adicionar nova conta",
                description:
                    "Adicione uma nova conta com os parâmetros recebidos",
                produces: ["application/json"],
                parameters: [
                    {
                        in: "body",
                        name: "body",
                        description: "Objeto conta",
                        required: true,
                        schema: {
                            $ref: "#/definitions/Conta",
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "Conta salva com sucesso",
                    },
                    "400": {
                        description: "Erro ao salvar conta",
                    },
                },
            },
            get: {
                tags: ["conta"],
                summary: "Listar contas",
                description: "Liste todas as contas cadastradas",
                produces: ["application/json"],
                parameters: [],
                responses: {
                    "200": {
                        description: "",
                        schema: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "integer",
                                    },
                                    nome: {
                                        type: "string",
                                    },
                                    valor: {
                                        type: "number",
                                    },
                                },
                            },
                            example: {
                                contas: [
                                    {
                                        id: 1,
                                        nome: "Joaquim Monteiro",
                                        valor: 100,
                                    },
                                    {
                                        id: 2,
                                        nome: "Tayrone Cigano",
                                        valor: -25.31,
                                    },
                                ],
                            },
                        },
                    },
                    "400": {
                        description: "Erro ao ler arquivo",
                    },
                },
            },
            put: {
                tags: ["conta"],
                summary: "Atualizar conta",
                description: "Atualizando uma conta existente",
                produces: ["application/json"],
                parameters: [
                    {
                        in: "body",
                        name: "body",
                        description: "Objeto conta precisa ter um ID",
                        required: true,
                        schema: {
                            $ref: "#/definitions/Conta",
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "Conta atualizada com sucesso",
                    },
                    "400": {
                        description: "Erro ao atualizar conta",
                    },
                    "404": {
                        description: "Conta não encontrada",
                    },
                },
            },
        },
        "/conta/{id}": {
            delete: {
                tags: ["conta"],
                summary: "Remover conta",
                description: "Remove um conta existente através do seu ID",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "ID da conta",
                        required: true,
                        type: "integer",
                        format: "int64",
                    },
                ],
                responses: {
                    "200": {
                        description: "Conta removida com sucessoo",
                    },
                    "400": {
                        description: "Erro ao ler arquivo",
                    },
                    "404": {
                        description: "Conta não encontrada",
                    },
                },
            },
            get: {
                tags: ["conta"],
                summary: "Buscar conta",
                description: "Retorna conta através do seu ID",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "ID da conta",
                        required: true,
                        type: "integer",
                        format: "int64",
                    },
                ],
                responses: {
                    "200": {
                        description: "",
                        schema: {
                            $ref: "#/definitions/Conta",
                        },
                    },
                    "400": {
                        description: "Erro ao ler arquivo",
                    },
                    "404": {
                        description: "Conta não encontrada",
                    },
                },
            },
        },
        "/conta/deposito": {
            put: {
                tags: ["conta"],
                summary: "Depositar valor",
                description: "Realiza a operação de depósito na conta",
                produces: ["application/json"],
                parameters: [
                    {
                        in: "body",
                        name: "body",
                        description: "Objeto conta precisa ter um ID",
                        required: true,
                        schema: {
                            $ref: "#/definitions/ExemploBodyOperacao",
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "Saldo atualizado com sucesso",
                    },
                    "400": {
                        description: "Erro ao atualizar saldo",
                    },
                    "405": {
                        description: "Valor inválido para depósito",
                    },
                },
            },
        },
        "/conta/saque": {
            put: {
                tags: ["conta"],
                summary: "Sacar valor",
                description: "Realiza a operação de saque na conta",
                produces: ["application/json"],
                parameters: [
                    {
                        in: "body",
                        name: "body",
                        description: "Objeto conta precisa ter um ID",
                        required: true,
                        schema: {
                            $ref: "#/definitions/ExemploBodyOperacao",
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "Saldo atualizado com sucesso",
                    },
                    "400": {
                        description: "Erro ao atualizar saldo",
                    },
                    "405": {
                        description: "Saldo insuficiente",
                    },
                },
            },
        },
    },
    definitions: {
        Conta: {
            type: "object",
            required: ["id", "nome", "valor"],
            properties: {
                id: {
                    type: "integer",
                    example: 1,
                },
                nome: {
                    type: "string",
                    example: "Joaquim Monteiro",
                },
                valor: {
                    type: "number",
                    example: 100,
                },
            },
        },
        ExemploBodyOperacao: {
            description: "Apenas para fins de exemplo",
            type: "object",
            required: ["id", "valor"],
            properties: {
                id: {
                    type: "integer",
                    example: 1,
                },
                valor: {
                    type: "number",
                    example: 500,
                },
            },
        },
    },
    externalDocs: {
        description: "Repositório no Github",
        url: "https://github.com/cleefsouza/my-bank-api",
    },
};

export default swaggerDoc;
