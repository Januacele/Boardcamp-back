import {Router} from 'express';
import { getCategories, createCategories } from '../controllers/categoriesController.js';
import { categoriesMiddlewares } from '../middlewares/categoriesMiddlewares.js';


const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", categoriesMiddlewares, createCategories);


export default categoriesRouter;