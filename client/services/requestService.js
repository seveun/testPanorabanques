import axios from 'axios';
import globalEnv from '../config/env';

const URL = globalEnv.APIURL;

export default class request {

  static async requestExtern(type, url, data={},) {
    let result;
    if (type === 'DELETE') {
      result = await axios.delete(url);
    }
    else if (type === 'POST') {
      result = await axios.post(url, data);
    }
    else if (type === 'PUT') {
      result = await axios.put(url, data);
    }
    else {
      result = await axios.get(url);
    }
    return result.data;
  }

  static async request(type, url, data={},) {
    let result;
    if (type === 'DELETE') {
      result = await axios.delete(URL+url);
    }
    else if (type === 'POST') {
      result = await axios.post(URL+url, data);
    }
    else if (type === 'PUT') {
      result = await axios.put(URL+url, data);
    }
    else {
      result = await axios.get(URL+url);
    }
    return result.data;
  }

  static getApiUrl() {
    return URL;
  }

}