import connection from "../dbStrategy/dbPostgres.js";
import customersSchema from "../schemas/customersSchema.js";

export async function checkCustomerSchema(req, res, next) {
    const customer = req.body;
    try {
        const { error } = customersSchema.validate(customer, { abortEarly: false });

        if (error) {
            res.status(400).send("Erro ao validar clientes");
            return
        }
    } catch (error) {
        res.status(500).send("Erro inesperado na validação dos dados.");
        return;
    }

    next();

}


export async function checkCustomerCpf(req, res, next) {
    const customer = req.body;
    try {
        const query = `
            SELECT * FROM customers
            WHERE cpf = $1
        `;

        const values = [customer.cpf];
        const checkExists = await connection.query(query, values);

        if (checkExists.rowCount !== 0) {
            res.status(409).send("Esse CPF já foi cadastrado.");
            return;
        }

    } catch (error) {
        res.status(500).send("Erro inesperado na validação dos dados.");
        return;
    }

    next();

}