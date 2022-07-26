import connection from "../dbStrategy/dbPostgres.js";


export async function getGames (req, res){
    const filterString = req.query.name;

    try {
        if (filterString){
            const query = `
            SELECT games.*  
            FROM games
            WHERE games.name LIKE '${filterString}%'
            `;
        
            const games = await connection.query(query);

            res.send(games.rows);

        } else {
            const query = `
                SELECT games.* 
                FROM games
                JOIN categories ON games."categoryId"=categories.id
            `;
            const games = await connection.query(query);

            res.send(games.rows);
        }

    } catch(error){
        console.log(error);
        res.status(500).send("Ocorreu um erro ao obter os jogos!");
    }
}




export async function creatGames(req, res){
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        const insertGame = `
        INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5 )
        `;

        const values = [name, image, stockTotal, categoryId, pricePerDay];
        await connection.query(insertGame, values);

        res.status(201).send("Jogo cadastrado com sucesso");

    } catch (error) {
        console.log(error);
        res.status(500).send("Erro inesperado no cadastro dos dados.");
    }
}
