<template>
  <main>
    <section>
      <div id="filterbar">
        <div class="filter-title"> Filter by team:</div>
        <div id="options">
          <a class="filter-group" v-on:click="selectedTeam = ''" v-bind:class="{'selected' : selectedTeam == ''}">ALL</a>
          <a v-for="team in allTaskTeams" class="filter-group" v-on:click="selectedTeam = team" v-bind:class="{'selected' : selectedTeam == team}">{{team}}</a>
        </div> <!-- #options -->
      </div> <!-- #filterbar -->
    </section>

    <hr/>

    <!-- kanban -->
    <section>
      <div v-if="this.task_data.all_tasks.length > 0" id="kanban">
        <div class="task-column">
          <div class="column-header">
            <div class="num-circle">{{notStartedTasks.length}}</div>
            <h2>Not Started</h2>
          </div>
          <draggable class="task-list" v-model="notStartedTasks" group="tasks" v-on:start="select" v-on:add="addTask(0)">
            <div v-for="task in notStartedTasks">
              <TaskCard v-bind:task="task"> </TaskCard>
            </div>
          </draggable>
        </div> <!-- #not-started -->

        <div class="task-column">
          <div class="column-header">
            <div class="num-circle">{{inProgressTasks.length}}</div>
            <h2>In Progress</h2>
          </div>
          <draggable class="task-list" v-model="inProgressTasks" group="tasks" v-on:start="select" v-on:add="addTask(1)">
            <div v-for="task in inProgressTasks">
              <TaskCard v-bind:task="task"> </TaskCard>
            </div>
          </draggable>
        </div> <!-- #in-progress -->

        <div class="task-column">
          <div class="column-header">
            <div class="num-circle">{{completedTasks.length}}</div>
            <h2>Complete</h2>
          </div>
          <draggable class="task-list" v-model="completedTasks" group="tasks" v-on:start="select" v-on:add="addTask(2)">
            <div v-for="task in completedTasks">
              <TaskCard v-bind:task="task"> </TaskCard>
            </div>
          </draggable>
        </div> <!-- #complete -->

        <div class="clear-float"></div>
      </div> <!-- #kanban -->
      <div v-else id="kanban" class="empty-list-style">
        <h2>Well, look at you.</h2>
        <h4>You have no tasks to complete</h4>
      </div>
    </section>
  </main>
</template>

<script>
import { task_data } from "../data"

window.moment = require('moment'); // for use on TaskCard component

import TaskCard from "../components/tasks/TaskCard.vue"
import draggable from "vuedraggable"
import AnimateSave from "../components/SaveAnimation"

export default {
  name: 'tasks',
  components:{
    TaskCard,
    draggable
  },
  mixins:[AnimateSave],
  methods:{
    select:function(evt){
      this.draggedElement = evt.item._underlying_vm_.id;
    },
    addTask:function(status){
      // let movedTask = this.task_data.all_tasks.find(task => task["id"] == this.draggedElement);
      // movedTask.status = status;
      task_data.update(this.draggedElement, status);
      this.animateSave();
    }
  },
  computed:{
    allTaskTeams: function () {
      let teamsSet = new Set();
      for (const task of task_data.all_tasks) {
        teamsSet.add(task.meeting.team.name);
      }
      return Array.from(teamsSet.values()).sort();
    },
    notStartedTasks:function(){
      let chosenTeam = this.selectedTeam;
      let filteredTasks = this.task_data.all_tasks.filter(task => task["status"] == 0)
      if (chosenTeam != ""){
        return filteredTasks.filter(task => task.team.name == this.selectedTeam)
      } else {
        return filteredTasks;
      }
    },
    inProgressTasks:function(){
      let chosenTeam = this.selectedTeam;
      let filteredTasks = this.task_data.all_tasks.filter(task => task["status"] == 1)
      if (chosenTeam != ""){
        return filteredTasks.filter(task => task.team.name == this.selectedTeam)
      } else {
        return filteredTasks;
      }
    },
    completedTasks:function(){
      let chosenTeam = this.selectedTeam;
      let filteredTasks = this.task_data.all_tasks.filter(task => task["status"] == 2)
      if (chosenTeam != ""){
        return filteredTasks.filter(task => task.team.name == this.selectedTeam)
      } else {
        return filteredTasks;
      }
    }
  },
  mounted:function(){
    task_data.get()
  },
  data:function(){
    return {
      selectedTeam:"",
      draggedElement:null,
      task_data:task_data
    }
  }
}

</script>
