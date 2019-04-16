<template>
  <div class="team">
    <h3 class="team-name">{{ team.name }}</h3>
    <h4 class="group-name" :class="team.color">{{ team.description }}</h4>
    <div class="team-members">
      <div class="member-img-div" v-for="member in team.members">
        <img v-bind:src="member.avatar" v-bind:alt="member.name">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"team-grouping",
  props:{
    team:Object
  }
}
</script>
