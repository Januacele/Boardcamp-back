import { Router } from "express";
import { getGames, creatGames } from '../controllers/gamesController.js';
import { gamesMiddlewares } from '../middlewares/gamesMiddlewares.js';


const gamesRouter = Router();


gamesRouter.get("/games", getGames);
gamesRouter.post("/games", gamesMiddlewares, creatGames);


export default gamesRouter;