<template>
  <main id="create-meeting-main" class="meeting-main">
    <section id="meeting-form">

      <div id="name">
        <label for="meeting-name">Meeting Name</label>
        <input
          id="meeting-name" type="text" name="name"
          placeholder="Planning extravaganza…"
          v-model="title"
        >
      </div>

      <div id="date-time-block">
        <div id="label-row">
          <label id="date-label" for="meeting-date">Date</label>
          <label id="time-label" for="meeting-time">Time</label>
        </div>

        <div id="field-row">
          <input
            id="meeting-date" type="date" name="name"
            v-model="date"
          >
          <div id="at">at</div>
          <input
            id="meeting-time" type="time" name="name"
            v-model="time"
          >
        </div>
      </div>

      <div id="location">
        <label for="meeting-loc">Location</label>
        <input
          id="meeting-loc" type="text" name="name"
          placeholder="Timberwolves Room…"
          v-model="location"
        >
      </div>

      <div id="add-team">
        <label>Team</label>
        <div id="team-search">
          <v-autocomplete
            :items="team_data.all_teams"
            :component-item="TeamSearchTemplate"
            :get-label="getLabel"
            v-model="team"
          ></v-autocomplete>
        </div>
      </div>

      <button class="submit-button" type="button">Create Meeting</button>
    </section>
  </main>
</template>

<script>
import { team_data } from "../../data";
import TeamSearch from "../../components/meetings/TeamSearchItem"

export default {
  name: 'add-team',
  components: {
    TeamSearch
  },
  data: function () {
    return {
      title: '',
      date: '',
      time: '',
      location: '',
      team_data: team_data,
      team: '',
      TeamSearchTemplate: TeamSearch
    }
  },
  mounted: function () {
    team_data.get()
  },
  methods: {
    getLabel(item) {
      if (!item) return ''
      return item.name
    }
  }
}
</script>

<style lang="sass">
  .v-autocomplete
    .v-autocomplete-input-group
      .v-autocomplete-input
        font-size: 1.5em
        padding: 10px 15px
        box-shadow: none
        border: 1px solid #555
        width: 100%
        outline: none
        background-color: #eee

      &.v-autocomplete-selected
        .v-autocomplete-input
          color: green
          background-color: #f2fff2

    .v-autocomplete-list
      width: 100%
      text-align: left
      border: none
      border-top: none
      max-height: 400px
      overflow-y: auto
      border-bottom: 1px solid #555

      .v-autocomplete-list-item
        cursor: pointer
        background-color: #fff
        padding: 10px
        border-bottom: 1px solid #555
        border-left: 1px solid #555
        border-right: 1px solid #555

        &:last-child
          border-bottom: none

        &:hover
          background-color: #eee

        abbr
          opacity: 0.8
          font-size: 0.8em
          display: block
          font-family: sans-serif
</style>