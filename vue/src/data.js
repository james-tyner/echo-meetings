import axios from 'axios';
import VueCookies from 'vue-cookies'

let data = {
  page: 'Dashboard',
  group: 'dashboard',
  back_url: process.env.VUE_APP_BACK_URL,
  username: null,
  updateUser: async function () {
    console.log(this.back_url + '/api/user/')
    axios.get(this.back_url + '/api/user/',
      { 'headers': { 'Authorization': 'Token ' + VueCookies.get('token') } })
      .then(res => {
        this.username = res.data.name;
        console.log(this.username);
      }).catch(err => {
      console.log(err);
    });
  }
}

export default data
