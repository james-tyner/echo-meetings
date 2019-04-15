<template>
  <div class="agenda-item">
    <div class="agenda-icon-tray">
      <i class="far fa-trash-alt" v-on:click="deleteItem"></i>
    </div>
    <input class="editable agenda-item-title" type="text" placeholder="A very important topic" v-model="this.agendaItem.title" v-on:change="updateItem"></input>
    <textarea
            class="editable agenda-item-description"
            contenteditable="true"
            placeholder="What’s this about?"
            v-model='this.agendaItem.description'
            v-on:change="updateItem"
    >
    </textarea>

    <!-- Notes -->
    <h3>Notes</h3>
    <textarea
            class="editable agenda-item-note"
            contenteditable="true"
            placeholder="Jot something down…"
            v-model='this.agendaItem.notes'
            v-on:change="updateItem"
    >
    </textarea>


    <!-- Action Items -->
    <div class="agenda-action-items">
      <div class="action-item" v-for="action in this.agendaItem.tasks">
        <input type="checkbox">
        <div class="action-item-text">
          <p contenteditable="true" class="action-item-description">{{action.description}}</p>
          <p contenteditable="true" class="due-date">{{action.due | humanDate}}</p>
        </div>
        <div class="assignees">
          <div v-if="!showAssignees" class="assignee-photo" v-for="assignee in action.assignees" :style="{ 'background-image': 'url(' + assignee.avatar + ')' }"></div>
          <i class="fas fa-user-plus"></i>
        </div>
      </div>
      <div class="action-item">
        <input type="checkbox" disabled>
        <div class="action-item-text">
          <input class="editable start-typing-description" type="text" placeholder="Add a task…"></input>
          <input class="editable start-typing-due-date" type="datetime-local" placeholder="due…"></input>
        </div>
        <div class="assignees">
          <i class="fas fa-user-plus"></i>
          <!-- Still need to add the modal for finding someone -->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { meeting_data } from '../../data'
import AnimateSave from "../SaveAnimation"


export default {
  name:"agenda-item",
  data:function(){
    return {
      meeting_data:meeting_data
    }
  },
  props: {
    agendaItem: Object,
    meeting: Object
  },
  mixins:[AnimateSave],
  methods:{
    deleteItem:function(){
      meeting_data.agenda.delete(this.meeting._id, this.agendaItem._id, this.agendaItem.title)
    },
    updateItem:async function(){
      var self = this;
      if (updateTimer){
        clearTimeout(updateTimer);
      }
      let updateTimer = setTimeout(() => {
        meeting_data.agenda.update(self.meeting._id, self.agendaItem._id, self.agendaItem.title, self.agendaItem.description, self.agendaItem.notes)
        self.animateSave();
      }, 1500)
      await updateTimer();
    }
  },
  filters: {
    humanDate: function (dueDateString) {
      var now = Date.now();
      var taskDueTime = new Date(dueDateString);
      var dateDiff = Math.abs(now - taskDueTime.getTime());

      dateDiff = Math.ceil(dateDiff / (1000 * 60 * 60 * 24));

      var taskTimeYear = moment(taskDueTime).format('YY');
      var thisYear = moment(now).format('YY');

      var dateFormatted;

      if (dateDiff > 5){
        if (taskTimeYear != thisYear) {
          dateFormatted = moment(taskDueTime).format('MMM D, YYYY [at] h:mm a');
        } else {
          dateFormatted = moment(taskDueTime).format('MMM D [at] h:mm a');
        }
      } else {
        dateFormatted = moment(taskDueTime).calendar();
      }

      return dateFormatted;
    }
  },
  computed: {

  },
  mounted:function(){
    console.log(this.agendaItem);
  }
}
</script>
