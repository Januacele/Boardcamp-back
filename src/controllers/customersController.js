import connection from "../dbStrategy/dbPostgres.js";


export async function getCustomers(req, res) {
    const filterString = req.query.cpf;
    try {
        if (filterString) {
            const query = `
                SELECT customers.*  
                FROM customers
                WHERE customers.cpf LIKE '${filterString}%'
            `;
            const customers = await connection.query(query);

            res.send(customers.rows);

        } else {
            const query = `
                SELECT customers.*  
                FROM customers
            `;
            const customers = await connection.query(query);

            res.send(customers.rows);
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao obter os clientes!");
    }
}

export async function getCustomer(req, res) {
    const { id } = req.params;

    try {
        const query = `
            SELECT customers.*  
            FROM customers
            WHERE customers.id = $1
        `;
        const values = [id];
        const customer = await connection.query(query,values);

        if (customer.rowCount === 0){
            res.status(404).send("Não existe um cliente com o id procurado.");
        }
        res.send(customer.rows[0]);

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao obter os dados do cliente!");
    }
}
export async function createCustomer(req, res){
    const { name, phone, cpf, birthday } = req.body;

    try {
        const insertCustomers = `
        INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4 )
        `;

        const values = [name, phone, cpf, birthday];
        await connection.query(insertCustomers, values);

        res.status(201).send("Cliente cadastrado com sucesso");

    } catch (error) {
        res.status(500).send("Erro inesperado no cadastro dos dados.");
        return;
    }
}


export async function updateCustomer(req,res){
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;

    try {
        const query = `
            UPDATE customers
            SET 
                name = $1,
                phone = $2,
                cpf = $3,
                birthday = $4
            WHERE id = $5
        `;
        const values = [name, phone, cpf, birthday, id];
        await connection.query(query,values);
        
        res.sendStatus(200);
        
    } catch(e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao editar os dados do cliente.");
    }
}