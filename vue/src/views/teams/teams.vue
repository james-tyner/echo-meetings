<template>

  <main id="teams-main">
    <section class="team-list">
      <div v-for="team in team_data.all_teams">
        <TeamCard v-bind:team="team"></TeamCard>
      </div>
    </section>
  </main>

</template>

<script>
import {team_data} from "../../data";
import TeamCard from "../../components/teams/TeamCard.vue"

export default {
  name: 'teams',
  components: {
    TeamCard
  },
  mounted: function () {
    this.$nextTick(function () {
      console.log('from Team mounted ' + this.$route.name);
      team_data.get()
    })
  },
  data: function () {
    return {
      team_data: team_data,
      fakeTeams: {
        "echo": {
          "id": 1,
          "color": "blue",
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
        "omega": {
          "id": 2,
          "color": "red",
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
    }
  }
}
</script>
