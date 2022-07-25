import connection from '../dbStrategy/dbPostgres.js';


export async function checkCustomerId(req, res, next){
    const { customerId } = req.body;

    try {
        const query = `
        SELECT * FROM customers
        WHERE id = $1
        `;
        const values = [customerId];
        const checkExists = await connection.query(query, values);

        if(checkExists.rowCount === 0){
            res.status(400).send("Esse cliente não existe.");
            return;
        }
    } catch (error) {
        res.status(500).send("Erro inesperado na validação dos dados.");
        return;
    }
    next();
}


export async function checkGameId(req, res, next){
    const { gameId } = req.body;

    try {
        const query = `
        SELECT * FROM games
        WHERE id = $1
        `;
        const values = [gameId];
        const checkExists = await connection.query(query, values);

        if(checkExists.rowCount === 0){
            res.status(400).send("Esse jogo não existe.");
            return;
        }
    } catch (error) {
        res.status(500).send("Erro inesperado na validação dos dados.");
        return;
    }
    next();
}

export async function daysRentedIsPositive(req, es, next){
    const {daysRentend } = req.body;

    if(daysRentend <= 0){
        res.status(400).send("Número inválido de dias");
        return;
    }
    next();
}

export async function gamesIsAvailable(req, res, next){
    const { gameId } = req.body;

    try {
        const queryGameStock = `
            SELECT games."stockTotal" as stock FROM games
            WHERE games.id = $1
        `;
        const valuesGameStock = [gameId];
        const gameStockResult = await connection.query(queryGameStock, valuesGameStock);
        const gameStock = gameStockResult.rows[0].stock;

        const queryRentals = `
            SELECT rentals.* FROM rentals
            WHERE rentals."gameId" = $1
        `;
        const valuesRentals = [gameId];
        const rentalsResult = await connection.query(queryRentals, valuesRentals);
        const rentalsTotal = rentalsResult.rowCount;

        if (rentalsTotal === gameStock) {
            res.status(400).send("Não há mais desse jogo em estoque.");
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Erro inesperado na validação dos dados.");
        return;
    }
    next();
}