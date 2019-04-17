<template>
  <div class="card" v-bind:class="colorBand">
    <h2 class="card-heading">{{meeting.title}}</h2>
    <p v-if="showHumanDate" v-on:mouseenter="swapDates" v-on:mouseleave="swapDates" class="card-date">{{humanDate}}</p>
    <p v-else v-on:mouseenter="swapDates" v-on:mouseleave="swapDates" class="card-date">{{fullDate}}</p>
    <div class="card-description">
      <div class="team-members">
        <div v-for="invitee in meeting.invitees" class="member-img-div">
          <img :src="invitee.avatar" :alt="invitee.name">
        </div>
      </div>
      <h3 class="card-team" :class="teamText">{{meeting.team.name}}</h3>
    </div>
  </div>
</template>

<script>

export default {
  name: "meeting-card",
  props: {
    meeting: Object
  },
  computed: {
    colorBand: function () {
      return (this.meeting.team.color + '-color-band')
    },
    teamText: function () {
      return (this.meeting.team.color)
    },
    humanDate: function () {
      var now = Date.now();
      var meetingTime = new Date(this.meeting.time);
      var dateDiff = Math.abs(now - meetingTime.getTime());

      dateDiff = Math.ceil(dateDiff / (1000 * 60 * 60 * 24));

      var meetingTimeYear = moment(meetingTime).format('YY');
      var thisYear = moment(now).format('YY');

      var dateFormatted;
      // if date is less than two weeks from now, say as "days from now" or "in XX days"
      // if date is more than two weeks from now, list month and day
      // if date is not in this year, list with year
      if (dateDiff > 14){
        if (meetingTimeYear != thisYear) {
          dateFormatted = moment(meetingTime).format('MMM D, YYYY');
        } else {
          dateFormatted = moment(meetingTime).format('MMM D');
        }
      } else {
        dateFormatted = moment(meetingTime).fromNow();
      }

      return dateFormatted;
    },
    fullDate:function(){
      var meetingTime = new Date(this.meeting.time);
      meetingTime = moment(meetingTime).format('MMM. D, YYYY [at] h:mm a')
      return meetingTime;
    }
  },
  methods: {
    swapDates(){
      this.showHumanDate = !this.showHumanDate
    }
  },
  data: function () {
    return {
      showHumanDate:true
    }
  }
}
</script>
