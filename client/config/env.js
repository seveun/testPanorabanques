let globalEnv;

if (process.env.NODE_ENV === 'production'){
  globalEnv = {
    BASEURL: 'http://localhost:4000',
    APIURL: 'http://localhost:3000',
  };
}
else {
  globalEnv = {
    BASEURL: 'http:/localhost:4000',
    APIURL: 'http://localhost:3000',
  }; 
}

export default globalEnv;