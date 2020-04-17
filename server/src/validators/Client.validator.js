import request from 'request';
import Moment from 'moment';
import { BadRequestError } from '../utils';

export default class ClientValidator {

  static gender(gender) {
    return gender.match(/male|female/)[0].toLowerCase();
  }

  static firstname(firstname) {
    return firstname.match(/^[a-zA-Z]+((['-][a-zA-Z ])?[a-zA-Z]*)*$/)[0].toLowerCase();
  }

  static lastname(lastname) {
    return lastname.match(/^[a-zA-Z]+((['-][a-zA-Z ])?[a-zA-Z]*)*$/)[0].toLowerCase();
  }

  static city(city) {
    return city
      .match(/^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\-\s]{1,60}$/)[0]
      .toLowerCase();
  }

  static email(email) {
    return email.match(/^[\w\-\+]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}$/)[0];
  }

  static birthdate(birthdate) {
    const parsedBirthdate = new Moment(birthdate);
    if ((new Moment()).diff(parsedBirthdate, 'years') > 15) return parsedBirthdate;
    throw new BadRequestError('bad date');
  }

  static postalCode(postalCode) {
    return postalCode.toString().match(/[0-9]{5}/)[0];
  }

  static streetNumber(streetNumber) {
    return streetNumber.toString().match(/[0-9]+/)[0];
  }

  static streetAddress(streetAddress) {
    return streetAddress.match(/[A-Za-z,\.\s]+/)[0].toLowerCase();
  }

  static async address({ postalCode, streetNumber, streetAddress, city }) {
    const url = `https://api-adresse.data.gouv.fr/search/?q=${streetNumber} ` +
    `${streetAddress}&postcode=${postalCode}&city=${city}`;
    const verifAdress = JSON.parse(await new Promise((resolve, reject) => {
      request({ url, method: 'GET' }, (error, response) => {
        if (error) {
          reject(error);
        }
        else if (response === undefined) reject(error);
        else resolve(response.body);
      });
    }).timeout(4000)).features.filter(address => {
      return address.properties.housenumber === streetNumber &&
      address.properties.postcode === postalCode && address.properties.city.toLowerCase() === city
      && address.properties.street.toLowerCase() === streetAddress;
    });
    return verifAdress.length > 0;
  }

}