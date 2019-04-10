<template>
  <main>
    <section>
      <div id="filterbar">
        Filter by group:
        <div id="options">
          <a class="filter-group" v-on:click="selectedTeam = ''" v-bind:class="{'selected' : selectedTeam == ''}">ALL</a>
          <a v-for="meeting in fakeMeetings" class="filter-group" v-on:click="selectedMeeting = meeting.team.name" v-bind:class="{'selected' : selectedMeeting == meeting.team.name}">{{meeting.team.name}}</a>
        </div> <!-- #options -->
      </div> <!-- #filterbar -->
    </section>

    <section class="meeting-cards">
      <div v-for="meeting in fakeMeetings">
        <MeetingCard v-bind:meeting="meeting"></MeetingCard>
      </div>
    </section>
    
  </main>
</template>

<script>
  window.moment = require('moment'); // for use on MeetingCard component

  import MeetingCard from "../components/meetings/MeetingCard.vue"
  export default {
    name: 'meetings',
    components: {
      MeetingCard
    }
  },
  computed: {  
  },
  methods: {
    filterMeetings:function(teamName) {
      this.selectedTeam = teamName;
    }
  },
  data: function() {
    return{
      selectedTeam:"",
      fakeMeetings: [
        {
          "meetings": [{
            "id": "1",
            "title": "Presentation Planning",
            "time": "1553479225106",
            "location": "TTH 110",
            "invitees": [{
              "name": "Tommy Trojan",
              "username": "trojan.echo",
              "email": "trojan@usc.edu",
              "image": null
            }],
            "agendas": [{
              "id": "1",
              "title": "Agenda",
              "description": "Details",
              "notes": "Notes",
              "tasks": [{
                "id": "1",
                "name": "Task",
                "description": "Details",
                "due": "1553479225106",
                "status": "1"
              }]
            }],
            "team": {
              "id": "1",
              "name": "WRIT 340",
              "description": "Details",
              "color": "blue",
              "members": [{
                "name": "Mars Tan",
                "username": "mars.tanjx",
                "email": "jianxuat@usc.edu",
                "image": null
              }]
            },
            "start": "1553479225106",
            "end": "1553480225106"
          }]
        },{
          "meetings": [{
            "id": "2",
            "title": "Playoff Logistics",
            "time": "1553479225106",
            "location": "TTH 110",
            "invitees": [{
              "name": "Tommy Trojan",
              "username": "trojan.echo",
              "email": "trojan@usc.edu",
              "image": null
            }],
            "agendas": [{
              "id": "1",
              "title": "Agenda",
              "description": "Details",
              "notes": "Notes",
              "tasks": [{
                "id": "1",
                "name": "Task",
                "description": "Details",
                "due": "1553479225106",
                "status": "1"
              }]
            }],
            "team": {
              "id": "2",
              "name": "SOCCER CLUB",
              "description": "Details",
              "color": "red",
              "members": [{
                "name": "Mars Tan",
                "username": "mars.tanjx",
                "email": "jianxuat@usc.edu",
                "image": null
              }]
            },
            "start": "1553479225106",
            "end": "1553480225106"
          }]
        }
      ]

</script>
