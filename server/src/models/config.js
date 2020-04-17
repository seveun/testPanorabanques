import Sequelize from 'sequelize';

const {
  // dev variables
  DEV_MYSQL_NAME_SERVER,
  DEV_MYSQL_USER_SERVER,
  DEV_MYSQL_PASSWORD_SERVER,
  DEV_MYSQL_HOST_SERVER,
  // prod variables:
  MYSQL_NAME_SERVER,
  MYSQL_USER_SERVER,
  MYSQL_PASSWORD_SERVER,
  MYSQL_HOST_SERVER,
  MYSQL_PORT,
  NODE_ENV,
  DEBUG_SEQUELIZE,
} = process.env;

let sequelizes;
let sequilize_debug = false;

if (DEBUG_SEQUELIZE === 'false') sequilize_debug = false;

if (NODE_ENV === 'local') {
  sequelizes = new Sequelize(
    DEV_MYSQL_NAME_SERVER,
    DEV_MYSQL_USER_SERVER,
    DEV_MYSQL_PASSWORD_SERVER,
    {
      host: DEV_MYSQL_HOST_SERVER,
      dialect: 'mysql',
      operatorsAliases: false,
      logging: sequilize_debug,
    },
  );
} else if (NODE_ENV === 'prod') {
  sequelizes = new Sequelize(
    MYSQL_NAME_SERVER,
    MYSQL_USER_SERVER,
    MYSQL_PASSWORD_SERVER,
    {
      host: MYSQL_HOST_SERVER,
      dialect: 'mysql',
      operatorsAliases: false,
      logging: false,
      port: MYSQL_PORT,
    },
  );
}
const sequelize = sequelizes;
export default sequelize;