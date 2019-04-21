<template>
  <div class="card" v-bind:class="colorBand">
    <h3 class="card-team" v-on:click="toggle()" v-bind:class="teamText">{{meeting.team.name}}</h3>
    <h2 class="card-heading" v-on:click="toggle()">{{meeting.title}}</h2>
    <p v-if="showHumanDate" v-on:mouseenter="swapDates" v-on:mouseleave="swapDates" class="mtg-date">{{humanDate}}</p>
    <p v-else v-on:mouseenter="swapDates" v-on:mouseleave="swapDates" class="mtg-date">{{fullDate}}</p>
    <p v-if="numberOfUnassignedTasks" class="mtg-unassigned-tasks"><i class="fas fa-exclamation-triangle"></i> {{numberOfUnassignedTasks}} unassigned action <span v-if="numberOfUnassignedTasks == 1">item</span><span v-else>items</span></p>
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

      if (dateFormatted != "Invalid date"){
        return dateFormatted;
      } else {
        return ""
      }
    },
    fullDate:function(){
      var meetingTime = new Date(this.meeting.time);
      meetingTime = moment(meetingTime).format('MMM. D, YYYY [at] h:mm a')
      return meetingTime;
    },
    numberOfUnassignedTasks:function(){
      var numUnassigned = 0;
      let meetingAgendaItems = this.meeting.agendas;
      meetingAgendaItems = meetingAgendaItems.filter(agendaItem => (agendaItem.tasks && agendaItem.tasks.length > 0));
      for (var agendaItem of meetingAgendaItems){
        for (var task of agendaItem.tasks){
          if (!task.assignees || task.assignees.length == 0){
            numUnassigned += 1
          }
        }
      }
      return numUnassigned;
    }
  },
  methods: {
    toggle() {
      this.showAll = !this.showAll
    },
    swapDates(){
      this.showHumanDate = !this.showHumanDate
    }
  },
  data: function () {
    return {
      showAll: false,
      showHumanDate:true
    }
  }
}
</script>
