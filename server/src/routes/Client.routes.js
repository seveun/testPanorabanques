import controllers from '../controllers';

export default [
  {
    method: 'GET',
    path: '/client',
    validators: [],
    handler: controllers.Client.getClient,
  },
  {
    method: 'POST',
    path: '/client',
    validators: [],
    handler: controllers.Client.createClient,
  },
  {
    method: 'DELETE',
    path: '/client',
    validators: [],
    handler: controllers.Client.deleteClient,
  },
  {
    method: 'GET',
    path: '/client/stat',
    validators: [],
    handler: controllers.Client.getClientStat,
  },
  {
    method: 'GET',
    path: '/client/export',
    validators: [],
    handler: controllers.Client.exportClient,
  },
  {
    method: 'POST',
    path: '/client/import',
    validators: [],
    handler: controllers.Client.importClient,
  },
];