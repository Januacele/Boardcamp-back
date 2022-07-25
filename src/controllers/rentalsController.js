import connection from "../dbStrategy/dbPostgres.js";
import dayjs from 'dayjs';

export async function createRental(req, res){
    const { gameId, customerId, daysRented} = req.body;
    const today = dayjs().format('YYYY-MM-DD');

    try {
        const queryPrice = `
            SELECT games."pricePerDay" as price 
            FROM games
            WHERE games.id = $1
        `;
        const valuesPrice = [gameId];
        const priceResult = await connection.query(queryPrice,valuesPrice);
        const totalPrice = priceResult.rows[0].price * daysRented;

        const queryNewRental = `
            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const valuesNewRental = [
            customerId,
            gameId,
            today,
            daysRented,
            null,
            totalPrice,
            null
        ];
        await connection.query(queryNewRental, valuesNewRental);
        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocorreu um erro nessa transação.");
    }
}