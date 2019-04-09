import axios from 'axios';
import VueCookies from 'vue-cookies'

const app_data = {
  page: 'Dashboard',
  group: 'dashboard',
  updatePage(newPage) {
    this.page = newPage;
  },
  updateGroup(newGroup) {
    this.group = newGroup;
  },
  back_url: process.env.VUE_APP_BACK_URL
}

let user_data = {
  username: '',
  avatar: '',
  updateUser: async function () {
    if (!VueCookies.isKey('token')) {
      return;
    }
    console.log(app_data.back_url + '/api/user/')
    axios.get(app_data.back_url + '/api/user/',
      { 'headers': { 'Authorization': 'Token ' + VueCookies.get('token') } })
      .then(res => {
        this.username = res.data.name;
        this.avatar = res.data.avatar;
        console.log(this.username);
      }).catch(err => {
      console.log(err);
    });
  }
}

export {app_data, user_data}
