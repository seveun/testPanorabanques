import { ClientService } from '../services';

export default class ClientController {

  static async getClient(req) {
    const Clients = await ClientService.getClient(req.query);
    return Clients;
  }

  static async createClient(req) {
    const Clients = await ClientService.createClient(req.body);
    return Clients;
  }

  static async deleteClient(req) {
    const nbrClientDelete = await ClientService.deleteClient(req.params);
    return nbrClientDelete;
  }

  static async getClientStat(req) {
    const result = await ClientService.getClientStat(req.query);
    return result;
  }

  static async exportClient(req, res) {
    const File = await ClientService.exportClient(req.query);
    res.attachment('export_clients.csv');
    res.send(Buffer.from(File));
  }

  static async importClient(req) {
    const totalImport = await ClientService.importClient(req.files);
    return totalImport;
  }

  static async updateClient(req) {
    const updateClient = await ClientService.updateClient(req.params, req.body);
    return updateClient;
  }

}