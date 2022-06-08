import { Router } from "express";
import { CreateClientController, UpdateClientController, ListClientsController, DeleteClientsController } from "./controllers/ClientController";

const router = Router();

const createClientsController = new CreateClientController();
const updateClientsController = new UpdateClientController ();
const listClientsController = new ListClientsController();
const deleteClientsController = new DeleteClientsController();

router.get("/clients", listClientsController.handle);
router.post("/clients", createClientsController.handle);
router.put("/clients/:id", updateClientsController.handle);
router.delete("/clients/:id", deleteClientsController.handle);

export { router };
