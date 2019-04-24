<template>
  <main id="teams-main">
    <section v-if="team_data.all_teams.length > 0" class="team-list">
      <div
        v-for="team in team_data.all_teams"
        :key="team._id"
      >
        <TeamCard v-bind:team="team"></TeamCard>
      </div>
    </section>
    <section v-else class="team-list empty-list-style">
      <div class="placeholder-page-container">
        <h2>You don’t have to go it alone.</h2>
        <p>Create a team to share meetings and tasks</p>
      </div>
    </section>
  </main>

</template>

<script>
import { team_data } from '../../data';
import TeamCard from '../../components/teams/TeamCard.vue';

export default {
  name: 'teams',
  components: {
    TeamCard,
  },
  mounted() {
    this.$nextTick(function () {
      console.log(`from Team mounted ${this.$route.name}`);
      team_data.get();
    });
  },
  data() {
    return {
      team_data,
    };
  },
};
</script>
