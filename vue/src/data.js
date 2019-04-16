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
      console.log(error);
      showAlert("red", `Error: ${error.message} (${error.response.data.errors.message})`);
      throw new Error(`ApiService ${error.message}`);
    });
  },

  post(resource, params) {
    console.log(`Sending POST ${resource}`, params)
    return Vue.axios.post(`${resource}`, params).catch(error => {
      console.log(error);
      showAlert("red", `Error: ${error.message} (${error.response.data.errors.message})`);
      throw new Error(`ApiService ${error.message}`);
    });
  },

  put(resource, params) {
    console.log(`Sending PUT ${resource}`, params)
    return Vue.axios.put(`${resource}`, params).catch(error => {
      console.log(error);
      showAlert("red", `Error: ${error.message} (${error.response.data.errors.message})`);
      throw new Error(`ApiService ${error.message}`);
    });
  },

  delete(resource) {
    console.log(`Sending DELETE ${resource}`)
    return Vue.axios.delete(resource).catch(error => {
      console.log(error);
      showAlert("red", `Error: ${error.message} (${error.response.data.errors.message})`);
      throw new Error(`ApiService ${error.response.data}`);
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

const user_data = {
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
        showAlert("green", `Successfully joined the team`);
      }
    });
  }
}

const team_data = {
  all_teams: [],
  get() {
    return ApiService.get('/team').then(res => {
      this.all_teams = res.data.teams;

      return this.all_teams 
    })
  },
  create(name, description, color) {
    ApiService.post(`/team`,
      { team: { name, description, color } })
      .then(() => {
          showAlert("green", `${name} created`);
          this.get();
        }
      )
  },
  update(id, name = null, description = null) {
    ApiService.put(`/team/${id}`,
      { team: { description } })
  },
  delete(id) {
    ApiService.delete(`/team/${id}`, {}).then(res => {
      this.get();
      showAlert("green", "Team deleted");
    })
  },
  invite(id, emails) {
    ApiService.post(`/team/${id}/invite`,
      { 'emails': emails }).then(res => {
      this.get();
      showAlert("green", "Invitation sent");
    })
  }
}

const meeting_data = {
  all_meetings: [],
  current_meeting: {},
  meeting: {
    get() {
      ApiService.get('/meeting').then(res => {
        meeting_data.all_meetings = res.data.meetings;
      })
    },
    getOne(m_id) {
      ApiService.get(`/meeting/${m_id}`).then(res => {
        meeting_data.current_meeting = res.data;
      })
    },
    create(title, time, team, location = '', invitees) {
      ApiService.post(`/meeting`,
        { 'meeting': { title, time, team, location, invitees } })
        .then(() => {
            showAlert("green", `${title} created`);
            this.get();
          }
        )
    },
    update(id, title = null, time = null, location = null, invitees = null) {
      const req = {};
      if (title) req.title = title;
      if (time) req.time = time;
      if (location) req.location = location;
      if (invitees) req.invitees = invitees;
      ApiService.put(`/meeting/${id}`,
        { 'meeting': req })
    },
    delete(id) {
      ApiService.delete(`/meeting/${id}`, {})
    }
  },
  agenda: {
    create(meeting_id, title, description = '', notes = '') {
      ApiService.post(`/meeting/${meeting_id}/agenda`,
        { 'agenda': { title, description, notes } })
        .then(() => {
            showAlert("green", "New agenda item created");
            meeting_data.meeting.get(); // forces refresh in Vue
          }
        )
    },
    update(meeting_id, agenda_id, title = null, description = null, notes = null) {
      const req = {};
      if (title) req.title = title;
      if (description) req.description = description;
      if (notes) req.notes = notes;
      ApiService.put(`/meeting/${meeting_id}/agenda/${agenda_id}`,
        { 'agenda': req })
    },
    delete(meeting_id, agenda_id, agenda_item_title) {
      ApiService.delete(`/meeting/${meeting_id}/agenda/${agenda_id}`, {}).then(() => {
        showAlert("red", `Removed ${agenda_item_title} from the meeting`)
        meeting_data.meeting.get(); // forces refresh in Vue
      })
    }
  }
}

const task_data = {
  all_tasks: [],
  get() {
    ApiService.get('/task').then(res => {
      this.all_tasks = res.data.tasks;
    })
  },
  create(meeting_id, agenda_id, name, description = null, note = null, assignees = null) {
    const req = {};
    if (meeting_id) req.meeting = meeting_id;
    if (agenda_id) req.agenda = agenda_id;
    if (name) req.name = name;
    if (description) req.description = description;
    if (note) req.note = note;
    if (assignees) req.assignees = assignees;
    ApiService.post(`/task`, { task: req })
      .then(() => {
          showAlert("green", `${name} created`);
          task_data.get();
        }
      )
  },
  update(task_id, status = null, name = null, description = null, note = null, assignees = null) {
    const req = {};
    if (status) req.status = status;
    if (name) req.name = name;
    if (description) req.description = description;
    if (note) req.note = note;
    if (assignees) req.assignees = assignees;
    ApiService.put(`/task/${task_id}`,
      { task: req })
      .then(() => {
          task_data.get();
        }
      )
  },
  delete(id) {
    ApiService.delete(`/task/${id}`, {}).then(res => {
      task_data.get();
      showAlert("red", "Task deleted");
    })
  }
}


export { ApiService, app_data, user_data, team_data, meeting_data, task_data }

