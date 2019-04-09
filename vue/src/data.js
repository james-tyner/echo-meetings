import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'


const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = app_data.back_url;
  },

  setHeader() {
    console.log('ApiService header set');
    Vue.axios.defaults.headers.common[
      "Authorization"
      ] = `Token ${VueCookies.get('token')}`;
  },

  get(resource, slug = "") {
    console.log(`Sending GET ${resource}/${slug}`)
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  },

  post(resource, params) {
    console.log(`Sending POST ${resource}/${params}`)
    return Vue.axios.post(`${resource}`, params);
  },

  put(resource, params) {
    console.log(`Sending PUT ${resource}/${params}`)
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    console.log(`Sending DELETE ${resource}/${params}`)
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  }
};

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
  updateUser() {
    if (!VueCookies.isKey('token')) {
      return;
    }
    ApiService.setHeader()
    ApiService.get('/user').then(res => {
      this.username = res.data.name;
      this.avatar = res.data.avatar;
      console.log(this.username)
    });
  }
}

let team_data = {
  all_teams: {},
  get() {
    ApiService.get('/team').then(res => {
      this.all_teams = res.data.teams;
    })
  },
  post(name, description) {

  },
}

export {ApiService, app_data, user_data, team_data}
