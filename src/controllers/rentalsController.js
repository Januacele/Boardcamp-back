import connection from "../dbStrategy/dbPostgres.js";
import dayjs from 'dayjs';


export async function getRentals (req, res){
    const filterCustomer = req.query.customerId;
    const filterGame = req.query.gameId;

    try {
        let query, values;
        if (!filterCustomer && !filterGame) {
            query = `
                SELECT rentals.* FROM rentals
            `;
            values = [];

        } else if (filterCustomer && filterGame) {
            query = `
                SELECT rentals.* FROM rentals
                WHERE 
                    rentals."customerId" = $1 AND
                    rentals."gameId" = $2   
            `;
            values = [filterCustomer, filterGame];

        } else if (filterGame) {
            query = `
                SELECT rentals.* FROM rentals
                WHERE 
                    rentals."gameId" = $1   
            `;
            values = [filterGame];

        } else if (filterCustomer) {
            query = `
                SELECT rentals.* FROM rentals
                WHERE 
                    rentals."customerId" = $1
            `;
            values = [filterCustomer];
        }

        const rentalsResult = await connection.query(query, values);
        const rentals = rentalsResult.rows;

        let finalRentals = [];
        for (let rental of rentals) {
            const queryCustomer = `
                SELECT customers.id, customers.name
                FROM customers
                WHERE customers.id = $1
            `;
            const valuesCustomer = [rental.customerId];
            const customerResult = await connection.query(queryCustomer, valuesCustomer);
            const customer = customerResult.rows[0];

            const queryGame = `
                SELECT games.id, games.name, 
                       categories.id as "categoryId", categories.name as "categoryName"
                FROM games
                JOIN categories
                ON games."categoryId" = categories.id
                WHERE games.id = $1
           `;
           const valuesGame = [rental.gameId];
            const gameResult = await connection.query(queryGame, valuesGame);
            const game = gameResult.rows[0];

            finalRentals.push({ ...rental, customer, game });
        }

        res.send(finalRentals);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocorreu um erro ao obter os dados da transação.");
    }
}


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