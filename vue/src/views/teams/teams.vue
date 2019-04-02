<template>

    <main id="teams-main">
      <section class="team-list">
        <div v-for="team in fakeTeams">
          <TeamCard v-bind:team="team"></TeamCard>
        </div>
      </section>
    </main>

</template>

<script>
import TeamCard from "../../components/teams/TeamCard.vue"

export default {
  name: 'teams',
  components:{
    TeamCard
  },
  data:function(){
    return {
      fakeTeams:{
        "echo": {
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
        "omega": {
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
    }
  }
}
</script>
