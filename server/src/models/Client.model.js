'user-strict';

module.exports = (sequelize, { STRING, DATE, INTEGER }) => {

  const Client = sequelize.define('Client', {
    gender: STRING,
    firstname: STRING,
    lastname: STRING,
    city: STRING,
    email: STRING,
    birthdate: DATE,
    postalCode: INTEGER,
    streetNumber: INTEGER,
    streetAddress: STRING,
  });
  return Client;
};