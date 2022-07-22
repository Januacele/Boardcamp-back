import connection from "../dbStrategy/dbPostgres.js";

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
        res.status(500).send("Erro inesperado no cadastro dos dados.");
        return;
    }
}
