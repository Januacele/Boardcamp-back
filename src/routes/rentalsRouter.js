import { Router } from 'express';
import { getRentals, createRental, closeRental, deleteRental } from './../controllers/rentalsController.js';
import { 
    checkCustomerId,
    checkGameId,
    daysRentedIsPositive,
    gamesIsAvailable,
    checkRentalId,
    checkRentalIsOpen,
    checkRentalIsClosed
   
} from './../middlewares/rentalsMiddleware.js';

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", daysRentedIsPositive, checkCustomerId, checkGameId, gamesIsAvailable, createRental);
rentalsRouter.post("/rentals/:id/return", checkRentalId, checkRentalIsOpen, closeRental);
rentalsRouter.delete("/rentals/:id", checkRentalId, checkRentalIsClosed, deleteRental);

export default rentalsRouter;
