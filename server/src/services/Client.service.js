import CSV from 'csvtojson';
import sequelize from 'sequelize';
import { parse } from 'json2csv';
import { ConflictError, BadRequestError } from '../utils';
import { ClientValidator } from '../validators';
import Models from '../models';

let ClientModel;
const ClientAttr = [
  'gender', 'firstname', 'lastname', 'city', 'email',
  'birthdate', 'postalCode', 'streetNumber', 'streetAddress',
];
export default class ClientService {

  static init() {
    if (ClientModel === undefined) ClientModel = Models.getModel('Client');
  }

  static async updateClient(get, params) {
    ClientService.init();
    if (!('id' in get)) throw new BadRequestError('id is missing');
    const validParams = {};
    ClientAttr.forEach(param => {
      try {
        if (param in params) validParams[param] = ClientValidator[param](params[param]);
      } catch (error) {
        throw new BadRequestError(`${param} is not valid`);
      }
    });
    try {
      const Client = await ClientModel.findOne({ where: { id: get.id } });
      await Client.update(validParams);
      return Client;
    } catch (error) {
      throw new BadRequestError('impossible to get client');
    }
  }

  static async getClient(params) {
    ClientService.init();
    const validParams = {};
    ClientAttr.forEach(param => {
      try {
        if (param in params) validParams[param] = ClientValidator[param](params[param]);
      } catch (error) {
        throw new BadRequestError(`${param} is not valid`);
      }
    });
    try {
      const Client = await ClientModel.findAll({
        where: validParams,
        attributes: {
          include: [
            ['id', 'key'],
          ],
        },
      });
      return Client;
    } catch (error) {
      throw new BadRequestError('impossible to get client');
    }
  }

  static async deleteClient(params) {
    ClientService.init();
    const validParams = {};
    ClientAttr.forEach(param => {
      try {
        if (param in params) validParams[param] = ClientValidator[param](params[param]);
      } catch (error) {
        throw new BadRequestError(`${param} is not valid`);
      }
    });
    try {
      const nbrClientDelete = await ClientModel.destroy({ where: validParams });
      return nbrClientDelete;
    } catch (error) {
      throw new BadRequestError('impossible to delete client');
    }
  }

  static async createClient(params) {
    ClientService.init();
    const validParams = {};
    ClientAttr.forEach(param => {
      try {
        validParams[param] = ClientValidator[param](params[param]);
      } catch (error) {
        if (!(param in params)) throw new BadRequestError(`${param} is missing`);
        throw new BadRequestError(`${param} is not valid`);
      }
    });
    const isClientExist = (await ClientService
      .getClient({ email: validParams.email })).length > 0;
    if (isClientExist) throw new ConflictError('client already exist');
    try {
      const verifAddress = await ClientValidator.address(validParams);
      if (!verifAddress) throw new BadRequestError('address does not exist');
    } catch (error) {
      throw new BadRequestError('address does not exist');
    }
    const Client = await ClientModel.create(validParams);
    return Client;
  }

  static async importClient(files) {
    ClientService.init();
    if (files === undefined || files === null) throw new BadRequestError('file is missing');
    let Clients;
    try {
      Clients = await new Promise((resolve, reject) => {
        CSV().fromString(files[''].data.toString())
          .then((clients) => resolve(clients))
          .catch(err => reject(err));
      });
    } catch (error) {
      throw new BadRequestError('invalid file');
    }
    let totalPush = 0;
    await Promise.each(Clients, async client => {
      try {
        await ClientService.createClient(client);
        totalPush += 1;
      } catch (error) {
        const err = error;
      }
    });
    return `${totalPush}\/${Clients.length}`;
  }

  static async exportClient(params) {
    const Clients = await ClientService.getClient(params);
    if (Clients.length < 1) throw new BadRequestError('no client found');
    try {
      return parse(JSON.parse(JSON.stringify(Clients)), ClientAttr);
    } catch (err) {
      throw new BadRequestError('export failed');
    }
  }

  static async getClientStat(params) {
    if (Object.keys(params).length < 1) {
      throw new BadRequestError('a parameter is required');
    }
    ClientService.init();
    const validParams = [];
    ClientAttr.forEach(param => {
      if (param in params) validParams.push(param);
    });
    try {
      const Client = await ClientModel.findAll({
        group: validParams,
        attributes: [
          ...validParams,
          ...validParams.map(attr =>
            [sequelize.fn('COUNT', `Client.${attr}`), `${attr}Total`]),
        ],
      });
      return Client;
    } catch (error) {
      throw new BadRequestError('impossible to get client');
    }
  }

}