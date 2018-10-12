import axios from 'axios';

const defaultConfig = {
  baseURL: '/api',
  timeout: 15000,
  responseType: 'json',
  maxContentLength: 2000,
  validateStatus: function(status) {
    return status >= 200 && status < 302;
  }
};


function request(api, option = {}) {
  let {
    method = 'get',
    params,
    query = {},
    data,
    quiet,
    consoleError = false
  } = option;

  let url = api.replace(/\$([\w]+)/g, (word, $1) => {
    return params[$1] ? params[$1] : word;
  });

  return new Promise((resolve, reject) => {

    axios({
      ...defaultConfig,
      ...{
        url,
        method,
        params: query,
        data
      }
    })
      .then(res => {
        resolve(res.data.Message);
      })
      .catch(error => {
        if (!quiet) {
          let e = error.toString();
          // errorTip(e);
          consoleError && reject(e);
        }
      });
  });
}

export default request;