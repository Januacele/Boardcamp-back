import {Router} from 'express';
import { getCategories } from '../controllers/categoriesController.js';
//importar middlewares


const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);
// categoriesRouter.post("/categories", categoriesMiddlewares, createCategories);


export default categoriesRouter;