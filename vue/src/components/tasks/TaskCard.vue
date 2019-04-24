<template>
  <div class="card" v-bind:class="colorBand">
    <h3 class="card-team" v-on:click="toggle()" v-bind:class="teamText">{{task.meeting.team.name}}</h3>
    <h2 class="card-heading" v-on:click="toggle()">{{task.name}}</h2>
    <div class="task-info" v-if="showAll">
      <p class="card-desc">{{task.description}}</p>
      <p class="card-date" v-bind:class="{'red' : overdueColor}">{{humanDate}}</p>
      <div class="task-assignees">
        <p class="assignee-heading">Assigned to</p>
        <div v-for="assignee in task.assignees" class="assignee">
          <div class="profile-photo"
               :style="{ 'background-image' : 'url(' + task.meeting.team.members.find(person => person._id == assignee).avatar + ')'}"></div>
          <p class="member-name">{{task.meeting.team.members.find(person => person._id == assignee).name}}</p>
        </div>
      </div>
    </div>
    <div v-else v-on:click="toggle()" class="card-icons">
      <div class="icon-group"><i class="fas fa-user-circle"></i> {{task.assignees.length}}</div>
      <!-- <div class="icon-group"><i class="fas fa-comment"></i> 5</div> -->
      <div class="icon-group" v-bind:class="{'red' : overdueColor}"><i class="fas fa-clock" v-if="humanDate != ''"></i>{{humanDate}}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'task-card',
  props: {
    task: Object,
  },
  computed: {
    colorBand() {
      return (`${this.task.meeting.team.color}-color-band`);
    },
    teamText() {
      return (this.task.meeting.team.color);
    },
    humanDate() {
      const now = Date.now();
      const dueDate = new Date(this.task.due);
      let dateDiff = Math.abs(now - dueDate.getTime());

      dateDiff = Math.ceil(dateDiff / (1000 * 60 * 60 * 24));

      const dueDateYear = moment(dueDate).format('YY');
      const thisYear = moment(now).format('YY');

      let dateFormatted;
      // if date is less than two weeks from now, say as "days from now" or "in XX days"
      // if date is more than two weeks from now, list month and day
      // if date is not in this year, list with year
      if (dateDiff > 14) {
        if (dueDateYear !== thisYear) {
          dateFormatted = moment(dueDate).format('MMM D, YYYY');
        } else {
          dateFormatted = moment(dueDate).format('MMM D');
        }
      } else {
        dateFormatted = moment(dueDate).fromNow();
      }

      if (dateFormatted !== 'Invalid date') {
        return `due ${dateFormatted}`;
      }
      return '';
    },
    overdueColor() {
      const now = Date.now();
      let dueDate = new Date(this.task.due);
      dueDate = dueDate.getTime();

      if (now > dueDate) {
        return true;
      }
      return false;
    },
  },
  methods: {
    toggle() {
      this.showAll = !this.showAll;
    },
  },
  data() {
    return {
      showAll: false,
    };
  },
};
</script>
