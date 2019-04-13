<template>
  <div class="card" v-bind:class="colorBand">
    <h3 class="card-team" v-on:click="toggle()" v-bind:class="teamText">{{meeting.team.name}}</h3>
    <h2 class="card-heading" v-on:click="toggle()">{{meeting.title}}</h2>
    <p class="mtg-date"> {{humanDate}}</p>

    <!-- Need to send user to meeting details page on click -->
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
      // Date.prototype.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      // Date.prototype.getMonthName = function () {
      //   return this.monthNames[this.getMonth()];
      // };
      //
      // var date = new Date(this.meeting.time);
      // var month = date.getMonthName();
      // var day = date.getDate();
      // var fullDate = month + ' ' + day;
      // return fullDate;

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
    }
  },
  methods: {
    toggle() {
      this.showAll = !this.showAll
    }
  },
  data: function () {
    return {
      showAll: false
    }
  }
}
</script>
