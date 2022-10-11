const access_key = 'a496e2631269f82167f1fe1bd55d7c82';

const ApiType = {
  news: 'news',
};

import axios from 'axios'

class ServerHelper {

  getBaseURL() {
    return 'http://api.mediastack.com/v1/';
  }

  async fetchNews() {
    let request = this.getBaseURL() + ApiType.news + '?access_key=' + access_key + '&languages='+ 'en'+ '&countries='+ 'us';
    return axios.get(request)
      .then(response => {
        if (response.status == 200) {
          return response.data;
        } else return [];
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  }
}

const serverHelper = new ServerHelper();
export default serverHelper;