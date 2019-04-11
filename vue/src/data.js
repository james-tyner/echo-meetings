import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'

import showAlert from "./components/ShowAlert"


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
      throw new Error(`ApiService ${error.message}`);
    });
  },

  post(resource, params) {
    console.log(`Sending POST ${resource}`, params)
    return Vue.axios.post(`${resource}`, params).catch(error => {
      console.log(error);
      throw new Error(`ApiService ${error.message}`);
    });
  },

  put(resource, params) {
    console.log(`Sending PUT ${resource}`, params)
    return Vue.axios.put(`${resource}`, params).catch(error => {
      throw new Error(`ApiService ${error.message}`);
    });
  },

  delete(resource) {
    console.log(`Sending DELETE ${resource}`)
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
      console.log(this.username);
      if (VueCookies.isKey('invite')) {
        const invite = VueCookies.get('invite');
        ApiService.get('/team/join', invite);
        VueCookies.remove('invite');
      }
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
  create(name, description, color) {
    ApiService.post(`/team`,
      { 'team': { 'name': name, 'description': description, 'color': color } })
      .then(() => {
        showAlert("green",`${name} created`);
        this.get();
        }
      )
  },
  put(id, name = null, description = null) {
    ApiService.put(`/team/${id}`,
      { 'team': { 'description': description } })
  },
  invite(id, emails) {
    ApiService.post(`/team/${id}/invite`,
      { 'emails': emails }).then(res => {
      this.get();
    })
  }
}

export {ApiService, app_data, user_data, team_data}
