<template>
  <main id="add-team-main">
    <div id="name">
      <label for="team-name">Team Name</label>
      <input
              type="text" id="team-name"
              placeholder="The Best Team Ever…"
              v-model="name"
      >
    </div>
    <div id="location">
      <label for="team-description">Description</label>
      <textarea
              id="team-description"
              placeholder="A group dedicated to world peace"
              v-model="description"
      ></textarea>
    </div>
    <button @click="onCreateTeam">Create New Team</button>
  </main>
</template>

<script>

import {team_data} from "../../data";

const possibleColors = ['green', 'blue', 'red', 'magenta', 'orange']

export default {
  name: 'add-team',
  data: function () {
    return {
      name: '',
      description: ''
    }
  },
  methods: {
    onCreateTeam() {
      if (this.name === '') return
      const color = possibleColors[Math.floor(Math.random() * possibleColors.length)]
      team_data.create(this.name, this.description, color);
      this.$router.push('../teams')
    }
  }
}
</script>

