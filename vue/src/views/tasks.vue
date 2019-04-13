<template>
  <main>
    <section>
      <div id="filterbar">
        <div class="filter-title"> Filter by team:</div>
        <div id="options">
          <a class="filter-group" v-on:click="selectedTeam = ''" v-bind:class="{'selected' : selectedTeam == ''}">ALL</a>
          <a v-for="task in fakeTasks" class="filter-group" v-on:click="selectedTeam = task.team.name" v-bind:class="{'selected' : selectedTeam == task.team.name}">{{task.team.name}}</a>
        </div> <!-- #options -->
      </div> <!-- #filterbar -->
    </section>

    <hr/>

    <!-- kanban -->
    <section>
      <div id="kanban">
        <div class="task-column">
          <div class="column-header">
            <div class="num-circle">{{notStartedTasks.length}}</div>
            <h2>Not Started</h2>
          </div>
          <section class="task-list">
            <div v-for="task in notStartedTasks">
              <TaskCard v-bind:task="task"> </TaskCard>
            </div>
          </section>
        </div> <!-- #not-started -->

        <div class="task-column">
          <div class="column-header">
            <div class="num-circle">{{inProgressTasks.length}}</div>
            <h2>In Progress</h2>
          </div>
          <section class="task-list">
            <div v-for="task in inProgressTasks">
              <TaskCard v-bind:task="task"> </TaskCard>
            </div>
          </section>
        </div> <!-- #in-progress -->

        <div class="task-column">
          <div class="column-header">
            <div class="num-circle">{{completedTasks.length}}</div>
            <h2>Complete</h2>
          </div>
          <section class="task-list">
            <div v-for="task in completedTasks">
              <TaskCard v-bind:task="task"> </TaskCard>
            </div>
          </section>
        </div> <!-- #complete -->

        <div class="clear-float"></div>
      </div> <!-- #kanban -->
    </section>
  </main>
</template>

<script>
window.moment = require('moment'); // for use on TaskCard component

import TaskCard from "../components/tasks/TaskCard.vue"
export default {
  name: 'tasks',
  components:{
    TaskCard
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
      fakeTasks:[
        {
          "id": 1,
          "name": "Finish A11",
          "description": "need to finish",
          "due": 1553479225106,
          "status": 1,
          "assignees":[{
            "name": "Tommy Trojan",
            "username": "trojan.echo",
            "avatar": "https://randomuser.me/api/portraits/thumb/women/65.jpg"
          }, {
            "name": "Mars Tan",
            "username": "mars.tanjx",
            "avatar": "https://randomuser.me/api/portraits/thumb/men/62.jpg"
          }],
          "team":{
            "id": 1,
            "color":"blue",
            "name": "Team Echo",
            "description": "This team isn't even real.",
            "members": [{
              "name": "Tommy Trojan",
              "username": "trojan.echo",
              "avatar": "https://randomuser.me/api/portraits/thumb/women/65.jpg"
            }, {
              "name": "Mars Tan",
              "username": "mars.tanjx",
              "avatar": "https://randomuser.me/api/portraits/thumb/men/62.jpg"
            }]
          }
        },
        {
          "id": 2,
          "name": "Finish Everything",
          "description": "please finish everything",
          "due": 1554867187000,
          "status": 2,
          "assignees":[{
            "name": "Courtney Dunlap",
            "username": "trojan.echo",
            "avatar": "https://randomuser.me/api/portraits/thumb/men/63.jpg"
          }],
          "team":{
            "id": 2,
            "color":"red",
            "name": "Dance Club",
            "description": "This team is super not real.",
            "members": [{
              "name": "Courtney Dunlap",
              "username": "trojan.echo",
              "avatar": "https://randomuser.me/api/portraits/thumb/men/63.jpg"
            }, {
              "name": "James Tyner",
              "username": "james",
              "avatar": "https://randomuser.me/api/portraits/thumb/women/72.jpg"
            }, {
              "name": "Joy Verve",
              "username": "joy",
              "avatar": "https://randomuser.me/api/portraits/thumb/women/42.jpg"
            }]
          }
        }
      ]
    }
  }
  }

</script>
