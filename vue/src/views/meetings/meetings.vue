<template>
  <main>
    <section style="position:relative;">
      <div id="filterbar">
        <div class="filter-title"> Filter by team:</div>
        <div id="options">
          <a class="filter-group" v-on:click="selectedTeam = ''" v-bind:class="{'selected' : selectedTeam == ''}">ALL</a>
          <a v-for="team in this.allTeamNames" class="filter-group" v-on:click="selectedTeam = team" v-bind:class="{'selected' : selectedTeam == team}">{{team}}</a>
        </div> <!-- #options -->
      </div> <!-- #filterbar -->
    </section>

    <hr/>

    <section class="meeting-cards">
      <h2>Upcoming</h2>
      <div v-if="this.upcomingFilteredMeetings.length == 0" id="no-upcoming-meetings">
        No meetings coming up <span v-if="selectedTeam != ''">in {{selectedTeam}}</span>
      </div>
      <div v-for="meeting in upcomingFilteredMeetings" class="mtg-card">
        <router-link :to="`/meeting/details/${meeting.id}`" class="dropdown-item">
          <MeetingCard v-bind:meeting="meeting"></MeetingCard>
        </router-link>
      </div>
    </section>

    <section v-if="this.pastFilteredMeetings.length > 0" class="meeting-cards">
      <hr/>
      <h2>Past</h2>
      <div v-for="meeting in pastFilteredMeetings" class="mtg-card">
        <router-link :to="`/meeting/details/${meeting.id}`" class="dropdown-item">
          <MeetingCard v-bind:meeting="meeting"></MeetingCard>
        </router-link>
      </div>
    </section>

  </main>
</template>

<script>
window.moment = require('moment'); // for use on MeetingCard component

import MeetingCard from "../../components/meetings/MeetingCard"

export default {
  name: 'meetings',
  components: {
    MeetingCard
  },
  computed:{
    allTeamNames:function(){
      let teamsSet = new Set();
      for (var meeting of this.fakeMeetings){
        teamsSet.add(meeting["team"]["name"]);
      }
      return Array.from(teamsSet.values());
    },
    upcomingFilteredMeetings:function(){
      let chosenTeam = this.selectedTeam;
      let filteredMeetings = this.fakeMeetings.filter(meeting => meeting.team.name == chosenTeam);

      var now = Date.now();

      if (chosenTeam != ""){
        let futureMeetings = filteredMeetings.filter(meeting => meeting.time > now)
        return futureMeetings.filter(meeting => meeting.team.name == this.selectedTeam)
      } else {
        let futureMeetings = this.fakeMeetings.filter(meeting => meeting.time > now)
        return futureMeetings;
      }
    },
    pastFilteredMeetings:function(){
      let chosenTeam = this.selectedTeam;
      let filteredMeetings = this.fakeMeetings.filter(meeting => meeting.team.name == chosenTeam);

      var now = Date.now();

      if (chosenTeam != ""){
        let futureMeetings = filteredMeetings.filter(meeting => meeting.time <= now)
        return futureMeetings.filter(meeting => meeting.team.name == this.selectedTeam)
      } else {
        let futureMeetings = this.fakeMeetings.filter(meeting => meeting.time <= now)
        return futureMeetings;
      }
    }
  },
  data: function() {
    return {
      selectedTeam:"",
      fakeMeetings: [
        {
          "id":1,
          "title":"Fakest Meeting",
          "time":1553479225106,
          "location":"TTH 110",
          "invitees":[{
            "name": "Tommy Trojan",
            "username": "trojan.echo",
            "avatar": "https://randomuser.me/api/portraits/thumb/women/65.jpg"
          }, {
            "name": "Mars Tan",
            "username": "mars.tanjx",
            "avatar": "https://randomuser.me/api/portraits/thumb/men/62.jpg"
          }],
          "agendas":[

          ],
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
          },
          "start":1553479225106,
          "end":1553480225106
        },
        {
          "id":2,
          "title":"Not So Fake Meeting",
          "time":1555479225106,
          "location":"TTH 110",
          "invitees":[{
            "name": "Tommy Trojan",
            "username": "trojan.echo",
            "avatar": "https://randomuser.me/api/portraits/thumb/women/65.jpg"
          }, {
            "name": "Mars Tan",
            "username": "mars.tanjx",
            "avatar": "https://randomuser.me/api/portraits/thumb/men/62.jpg"
          }],
          "agendas":[

          ],
          "team":{
            "id": 1,
            "color":"red",
            "name": "Team Jupiter",
            "description": "This team is not real.",
            "members": [{
              "name": "Tommy Trojan",
              "username": "trojan.echo",
              "avatar": "https://randomuser.me/api/portraits/thumb/women/65.jpg"
            }, {
              "name": "Mars Tan",
              "username": "mars.tanjx",
              "avatar": "https://randomuser.me/api/portraits/thumb/men/62.jpg"
            }]
          },
          "start":1554569225106,
          "end":1553980225106
        },
        {
          "id":3,
          "title":"Fakest Meeting",
          "time":1553479225106,
          "location":"TTH 110",
          "invitees":[{
            "name": "Tommy Trojan",
            "username": "trojan.echo",
            "avatar": "https://randomuser.me/api/portraits/thumb/women/65.jpg"
          }, {
            "name": "Mars Tan",
            "username": "mars.tanjx",
            "avatar": "https://randomuser.me/api/portraits/thumb/men/62.jpg"
          }],
          "agendas":[

          ],
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
          },
          "start":1553479225106,
          "end":1553480225106
        },
        {
          "id":4,
          "title":"Not So Fake Meeting",
          "time":1555479225106,
          "location":"TTH 110",
          "invitees":[{
            "name": "Tommy Trojan",
            "username": "trojan.echo",
            "avatar": "https://randomuser.me/api/portraits/thumb/women/65.jpg"
          }, {
            "name": "Mars Tan",
            "username": "mars.tanjx",
            "avatar": "https://randomuser.me/api/portraits/thumb/men/62.jpg"
          }],
          "agendas":[

          ],
          "team":{
            "id": 1,
            "color":"red",
            "name": "Team Jupiter",
            "description": "This team is not real.",
            "members": [{
              "name": "Tommy Trojan",
              "username": "trojan.echo",
              "avatar": "https://randomuser.me/api/portraits/thumb/women/65.jpg"
            }, {
              "name": "Mars Tan",
              "username": "mars.tanjx",
              "avatar": "https://randomuser.me/api/portraits/thumb/men/62.jpg"
            }]
          },
          "start":1554569225106,
          "end":1553980225106
        }
      ]
    }
  }
}
</script>
