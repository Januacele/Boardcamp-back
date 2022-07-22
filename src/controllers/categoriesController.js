import connection from '../dbStrategy/dbPostgres.js';


export async function getCategories (req, res) {
    try{
        const result = await connection.query('SELECT * FROM categories');
        const categories = result.rows;
        res.send(categories);

    }catch(e){
        res.status(500).send("Erro ao pegar as categorias");
    }

}