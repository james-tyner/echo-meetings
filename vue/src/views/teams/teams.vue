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
      team_data: team_data
    }
  }
}
</script>
