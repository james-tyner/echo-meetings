import axios from 'axios';
import VueCookies from 'vue-cookies'

let data = {
  page: 'Dashboard',
  group: 'dashboard',
  updatePage(newPage){
    this.page = newPage;
  },
  updateGroup(newGroup){
    this.group = newGroup;
  },
  back_url: process.env.VUE_APP_BACK_URL,
  username: "",
  updateUser: async function () {
    if(!VueCookies.isKey('token')) {
      return;
    }
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

export { data }
