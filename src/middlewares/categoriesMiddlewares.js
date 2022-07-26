import connection from '../dbStrategy/dbPostgres.js';
import categorieSchema from '../schemas/categorieSchema.js';


export async function categoriesMiddlewares(req, res, next) {
    const category = req.body;

    try {
        const { error } = categorieSchema.validate(category, { abortEarly: false });
        if (error) {
            res.status(400).send(error.details.map(detail => detail.message));
            return;
        }

        const query = `
            SELECT * FROM categories
            WHERE name = $1
        `;
        const values = [category.name.toLowerCase()];
        
        const checkExists = await connection.query(query, values);
      
        if (checkExists.rowCount !== 0) {
            res.status(409).send("Essa categoria já existe.");
            return;
        }
    } catch (error) {
        res.status(500).send("Erro inesperado na validação dos dados.");
        return;
    }

    next();
}
