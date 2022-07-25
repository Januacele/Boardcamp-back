import connection from '../dbStrategy/dbPostgres.js';


export async function getCategories (req, res) {
    try{
        const result = await connection.query('SELECT * FROM categories');
        const categories = result.rows;
        res.send(categories);

    }catch(error){
        console.log(error);
        res.status(500).send("Erro ao pegar as categorias");
    }

}

export async function createCategories (req, res) {
    const { name } = req.body;
    try{
        const insertCategory = `
        INSERT INTO categories (name) VALUES ($1)
        `;
        const values = [name];
        await connection.query(insertCategory, values);

        res.status(201).send("Categoria cadastrada com sucesso!");

    }catch(error){
        console.log(error)
        res.status(500).send("Erro ao cadastrar a categoria");
    }

}