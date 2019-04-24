<template>
  <div class="task-item-div">
    <router-link :to="`/meetings/details/${task.meeting._id}`">
      <label :for="'task-' + this.index">{{task.name}}</label>
    </router-link>
    <p class="task-due">{{humanDate}}</p>
    <select :id="'task' + this.index" v-model="task.status" v-on:change="updateStatus">
      <option value="0">Not Started</option>
      <option value="1">In Progress</option>
      <option value="2">Done</option>
    </select>
  </div>
</template>

<script>
import { task_data } from '../../data';

import AnimateSave from '../SaveAnimation';

export default {
  name: 'task-row',
  data() {
    return {
      task_data,
    };
  },
  props: {
    task: Object,
    index: Number,
  },
  mixins: [AnimateSave],
  computed: {
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
        if (dueDateYear != thisYear) {
          dateFormatted = moment(dueDate).format('MMM D, YYYY');
        } else {
          dateFormatted = moment(dueDate).format('MMM D');
        }
      } else {
        dateFormatted = moment(dueDate).fromNow();
      }

      if (dateFormatted != 'Invalid date') {
        return `due ${dateFormatted}`;
      }
      return '';
    },
  },
  methods: {
    updateStatus(event) {
      const newStatus = event.target.value;
      task_data.update(this.task._id, newStatus);
      this.animateSave();
    },
  },
};
</script>
