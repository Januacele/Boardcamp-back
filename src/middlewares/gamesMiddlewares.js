import connection from "../dbStrategy/dbPostgres.js";
import gameSchema from "../schemas/gameSchema.js";


export async function gamesMiddlewares(req, res){
    const game = req.body;

    try {
        let maxId = await connection.query(`SELECT MAX (id) FROM categories`);

        const { error } = gameSchema.validate(game, {abortEarly: false});

        if(error){
            return res.status(400).send("Erro de validação ao cadastrar os games");
        }

        const query = `
        SELECT name FROM games
        WHERE name = $1
    `;
    const values = [game.name.toLowerCase()];
    
    const checkExists = await connection.query(query, values);
  
    if (checkExists.rowCount !== 0) {
        res.status(409).send("Esse jogo já existe.");
        return;
    }

    } catch (error) {
        res.status(500).send("Erro inesperado na validação dos dados.");
        return;
    }
}