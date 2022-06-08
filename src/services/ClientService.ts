import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { ClientsRepositories } from "../repositories/ClientsRepositories";

interface IClientRequest {
  id?: string;
  name: string;
  cgc: string;
  phone: string;
  email: string;
  address: string;
  city: string;
}

class ListClientService {
  async execute() {
    const clientsRepositories = getCustomRepository(ClientsRepositories);

    const clients = await clientsRepositories.find();

    return classToPlain(clients);
  }
}

class CreateClientsService {
  async execute({ name, cgc, phone, email, address, city }: IClientRequest) {
    const clientsRepositories = getCustomRepository(ClientsRepositories);

    if (!email) {
      throw new Error("Email incorrect");
    }

    const clientAlreadyExists = await clientsRepositories.findOne({
      cgc,
    });

    if (clientAlreadyExists) {
      throw new Error("client already exists");
    }

    const client = clientsRepositories.create({
      name,
      cgc,
      phone,
      email,
      address,
      city
    });

    await clientsRepositories.save(client);

    return classToPlain(client);
  }
}

class EditClientsService {
  async execute({ id, name, cgc, phone, email, address, city }: IClientRequest) {
    const clientsRepositories = getCustomRepository(ClientsRepositories);

    const clientAlreadyExists = await clientsRepositories.findOne({
      id,
    });

    if (!clientAlreadyExists) {
      throw new Error("client does not exist!");
    }

    const newClient = clientsRepositories.create({
      id,
      name,
      cgc,
      phone,
      email,
      address,
      city
    });

    await clientsRepositories.update(id, newClient);

    return classToPlain(newClient);
  }
}

class DeleteClientsService {
  async execute({ id }) {
    const clientsRepositories = getCustomRepository(ClientsRepositories);

    const clientAlreadyExists = await clientsRepositories.findOne({
      id,
    });

    if (!clientAlreadyExists) {
      throw new Error("client does not exist or already deleted!");
    }

    await clientsRepositories.delete(id);

    return "Cliente deletado com sucesso!";
  }
}

export { CreateClientsService, EditClientsService, ListClientService, DeleteClientsService };
