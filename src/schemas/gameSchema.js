import joi from 'joi';
import connection from "../dbStrategy/dbPostgres.js";

let maxId = await connection.query(`SELECT MAX (id) FROM categories`);
maxId.rows[0].max ? maxId = maxId.rows[0].max : maxId = 1;

const gameSchema = joi.object({
    name: joi.string().trim().required(),
    image: joi.string().trim().required(),
    stockTotal: joi.number().greater(0).required(),
    categoryId: joi.number().min(1).max(maxId).required(),
    pricePerDay: joi.number().greater(0).required()

})


export default gameSchema;
