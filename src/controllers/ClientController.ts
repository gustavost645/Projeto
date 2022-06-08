import { Request, Response } from "express";
import { CreateClientsService, EditClientsService, ListClientService, DeleteClientsService } from "../services/ClientService";


class CreateClientController {
  async handle(request: Request, response: Response) {
    const { name, cgc, phone, email, address, city } = request.body;

    const createClientService = new CreateClientsService();

    const client = await createClientService.execute({
      name, 
      cgc, 
      phone, 
      email, 
      address, 
      city
    });

    return response.json(client);
  }
}

class UpdateClientController {
  async handle(request: Request, response: Response) {
    
    const { id } = request.params;

    const { name, cgc, phone, email, address, city } = request.body;

    const updateClientService = new EditClientsService();

    const client = await updateClientService.execute({
      id,
      name, 
      cgc, 
      phone, 
      email, 
      address, 
      city
    });

    return response.json(client);
  }
}

class ListClientsController {
  async handle(request: Request, response: Response) {
    const listClientsService = new ListClientService;

    const clients = await listClientsService.execute();

    return response.json(clients);
  }
}

class DeleteClientsController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteClientsService = new DeleteClientsService;

    await deleteClientsService.execute({id});

    return response.json("Cliente deletado com sucesso!");
  }
}

export { CreateClientController, UpdateClientController, ListClientsController, DeleteClientsController };
