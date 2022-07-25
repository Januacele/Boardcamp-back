import { Router } from 'express';

import { getCustomers, getCustomer, createCustomer, updateCustomer } from '../controllers/customersController.js';
import { checkCustomerSchema, checkCustomerCpf } from '../middlewares/customersMiddlewares.js';


const customersRouter = Router();


customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomer);
customersRouter.post("/customers", checkCustomerSchema, checkCustomerCpf, createCustomer);
customersRouter.put("/customers/:id", checkCustomerSchema, updateCustomer);


export default customersRouter;