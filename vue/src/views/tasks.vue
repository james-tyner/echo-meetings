<template>
  <main>
    <section>
      <div id="filterbar">
        Filter by team:
        <div id="options">
          <a class="filter-group" v-on:click="selectedTeam = ''" v-bind:class="{'selected' : selectedTeam == ''}">ALL</a>
          <a v-for="task in fakeTasks" class="filter-group" v-on:click="selectedTeam = task.team.name" v-bind:class="{'selected' : selectedTeam == task.team.name}">{{task.team.name}}</a>
        </div> <!-- #options -->
      </div> <!-- #filterbar -->
    </section>

    <hr/>

    <!-- kanban -->
    <section v-if="fakeTasks && fakeTasks.length > 0">
      <div id="kanban">
        <div class="task-column">
          <div class="column-header">
            <div class="num-circle">{{notStartedTasks.length}}</div>
            <h2>Not Started</h2>
          </div>
          <draggable class="task-list" v-model="notStartedTasks" group="tasks" v-on:start="select" v-on:add="addTask(1)">
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
          <draggable class="task-list" v-model="inProgressTasks" group="tasks" v-on:start="select" v-on:add="addTask(2)">
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
          <draggable class="task-list" v-model="completedTasks" group="tasks" v-on:start="select" v-on:add="addTask(3)">
            <div v-for="task in completedTasks">
              <TaskCard v-bind:task="task"> </TaskCard>
            </div>
          </draggable>
        </div> <!-- #complete -->

        <div class="clear-float"></div>
      </div> <!-- #kanban -->
    </section>
    <div v-else class="placeholder-page">
      <div class="placeholder-page-container">
        <h2>Well, look at you</h2>
        <p>You have no tasks to complete</p>
      </div>
    </div>
  </main>
</template>

<script>
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
      console.log(this.draggedElement);
    },
    addTask:function(status){
      console.log("status " + status);
      let movedTask = this.fakeTasks.find(task => task["id"] == this.draggedElement);
      console.log(movedTask);
      movedTask.status = status;
      this.animateSave();
    }
  },
  computed:{
    notStartedTasks:function(){
      let chosenTeam = this.selectedTeam;
      let filteredTasks = this.fakeTasks.filter(task => task["status"] == 1)
      if (chosenTeam != ""){
        return filteredTasks.filter(task => task.team.name == this.selectedTeam)
      } else {
        return filteredTasks;
      }
    },
    inProgressTasks:function(){
      let chosenTeam = this.selectedTeam;
      let filteredTasks = this.fakeTasks.filter(task => task["status"] == 2)
      if (chosenTeam != ""){
        return filteredTasks.filter(task => task.team.name == this.selectedTeam)
      } else {
        return filteredTasks;
      }
    },
    completedTasks:function(){
      let chosenTeam = this.selectedTeam;
      let filteredTasks = this.fakeTasks.filter(task => task["status"] == 3)
      if (chosenTeam != ""){
        return filteredTasks.filter(task => task.team.name == this.selectedTeam)
      } else {
        return filteredTasks;
      }
    }
  },
  data:function(){
    return{
      selectedTeam:"",
      draggedElement:null,
      fakeTasks:[
        // {
        //   "id": 1,
        //   "name": "Finish A11",
        //   "description": "need to finish",
        //   "due": 1553479225106,
        //   "status": 1,
        //   "assignees":[{
        //     "name": "Tommy Trojan",
        //     "username": "trojan.echo",
        //     "avatar": "https://randomuser.me/api/portraits/thumb/women/65.jpg"
        //   }, {
        //     "name": "Mars Tan",
        //     "username": "mars.tanjx",
        //     "avatar": "https://randomuser.me/api/portraits/thumb/men/62.jpg"
        //   }],
        //   "team":{
        //     "id": 1,
        //     "color":"blue",
        //     "name": "Team Echo",
        //     "description": "This team isn't even real.",
        //     "members": [{
        //       "name": "Tommy Trojan",
        //       "username": "trojan.echo",
        //       "avatar": "https://randomuser.me/api/portraits/thumb/women/65.jpg"
        //     }, {
        //       "name": "Mars Tan",
        //       "username": "mars.tanjx",
        //       "avatar": "https://randomuser.me/api/portraits/thumb/men/62.jpg"
        //     }]
        //   }
        // },
        // {
        //   "id": 2,
        //   "name": "Finish Everything",
        //   "description": "please finish everything",
        //   "due": 1554867187000,
        //   "status": 2,
        //   "assignees":[{
        //     "name": "Courtney Dunlap",
        //     "username": "trojan.echo",
        //     "avatar": "https://randomuser.me/api/portraits/thumb/men/63.jpg"
        //   }],
        //   "team":{
        //     "id": 2,
        //     "color":"red",
        //     "name": "Dance Club",
        //     "description": "This team is super not real.",
        //     "members": [{
        //       "name": "Courtney Dunlap",
        //       "username": "trojan.echo",
        //       "avatar": "https://randomuser.me/api/portraits/thumb/men/63.jpg"
        //     }, {
        //       "name": "James Tyner",
        //       "username": "james",
        //       "avatar": "https://randomuser.me/api/portraits/thumb/women/72.jpg"
        //     }, {
        //       "name": "Joy Verve",
        //       "username": "joy",
        //       "avatar": "https://randomuser.me/api/portraits/thumb/women/42.jpg"
        //     }]
        //   }
        // }
      ]
    }
  }
  }

</script>
