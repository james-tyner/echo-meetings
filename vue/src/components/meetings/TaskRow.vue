<template>
  <div class="task-item-div">
    <label class="task-name" :for="'task-' + this.index">{{task.name}}</label>
    <p class="task-due">{{humanDate}}</p>
    <div class="member-img-div" v-for="assignee in task.assignees">
      <img v-bind:src="assignee.avatar" v-bind:alt="assignee.name">
    </div>
    <select :id="'task' + this.index" v-model="task.status" disabled>
      <option value="0">Not Started</option>
      <option value="1">In Progress</option>
      <option value="2">Done</option>
    </select>
  </div>
</template>

<script>
import { task_data } from "../../data"

import AnimateSave from "../SaveAnimation"

export default {
  name:"task-row",
  data:function(){
    return {
      task_data:task_data
    }
  },
  props:{
    task:Object,
    index:Number
  },
  mixins:[AnimateSave],
  computed:{
    humanDate:function(){
      var now = Date.now();
      var dueDate = new Date(this.task.due);
      var dateDiff = Math.abs(now - dueDate.getTime());

      dateDiff = Math.ceil(dateDiff / (1000 * 60 * 60 * 24));

      var dueDateYear = moment(dueDate).format('YY');
      var thisYear = moment(now).format('YY');

      var dateFormatted;
      // if date is less than two weeks from now, say as "days from now" or "in XX days"
      // if date is more than two weeks from now, list month and day
      // if date is not in this year, list with year
      if (dateDiff > 14){
        if (dueDateYear != thisYear) {
          dateFormatted = moment(dueDate).format('MMM D, YYYY');
        } else {
          dateFormatted = moment(dueDate).format('MMM D');
        }
      } else {
        dateFormatted = moment(dueDate).fromNow();
      }

      if (dateFormatted != "Invalid date"){
        return "due " + dateFormatted;
      } else {
        return ""
      }
    }
  },
  methods:{
    updateStatus:function(event){
      let newStatus = event.target.value;
      task_data.update(this.task._id, newStatus);
      this.animateSave();
    }
  }
}
</script>

<style scoped lang="scss">
  .task-item-div {
    display:inline-flex;
    width:100%;
    align-items:center;
    justify-content:space-between;

    .task-name {
      margin-right:auto;
    }
  }

  select {
    margin-left:1em;
  }
</style>
