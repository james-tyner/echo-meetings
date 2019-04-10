<template>
  <main id="create-meeting-main" class="meeting-main">

    <form action="/api/meeting" method="post">
      <section id="meeting-form">
        <div id="name">
          <label for="meeting-name">Meeting Name</label>
          <input id="meeting-name" type="text" name="name" placeholder="Planning extravaganza…"></input>
        </div>

        <div id="date-time-block">
          <div id="label-row">
            <label id="date-label" for="meeting-date">Date</label>
            <label id="time-label" for="meeting-time">Time</label>
          </div>

          <div id="field-row">
            <input id="meeting-date" type="date" name="name"  ></input>
            <div id="at">at</div>
            <input id="meeting-time" type="time" name="name"  ></input>
          </div>
        </div>

        <div id="location">
          <label for="meeting-loc">Location</label>
          <input id="meeting-loc" type="text" name="name" placeholder="Timberwolves Room…"></input>
        </div>

        <button class="submit-button" type="button">Create Meeting</button>
      </section>
    </form>

    <section class="right-bar">

      <div id="add-team">
        <h3>Add Team</h3>
        <div id="team-search">
          <TeamSearch :teams="fakeTeams"></TeamSearch>
        </div>
      </div>

    </section>
  </main>
</template>

<script>
import TeamSearch from "../../components/TeamSearch.vue"
export default {
  name: 'add-team',
  components: {
    TeamSearch
  },
  data:function(){
    return {
      fakeTeams:[{
        "id": 1,
        "name": "ITP 460",
        "description": "Details",
        "color": "green",
        "members": [{
          "id": "1",
          "name": "Mars Tan",
          "username": "mars.tanjx",
          "email": "jianxuat@usc.edu",
          "image": null
        }]
      },{
        "id": 2,
        "name": "WRIT 340",
        "description": "Details",
        "color": "blue",
        "members": [{
          "id": "1",
          "name": "Mars Tan",
          "username": "mars.tanjx",
          "email": "jianxuat@usc.edu",
          "image": null
      }, {
        "id": 3,
        "name": "SOCCER CLUB",
        "description": "Details",
        "color": "red",
        "members": [{
          "id": "1",
          "name": "Mars Tan",
          "username": "mars.tanjx",
          "email": "jianxuat@usc.edu",
          "image": null
      }],

    }
  }
}
</script>
