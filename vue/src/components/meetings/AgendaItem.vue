<template>
  <div class="agenda-item">
    <h2>{{this.agendaItem.title}}</h2>
    <p contenteditable="true" class="agenda-item-description">{{this.agendaItem.description}}</p>

    <!-- Notes -->
    <div v-if="showNotes">
      <h3>Notes</h3>
      <p contenteditable="true" class="agenda-item-note">{{this.agendaItem.notes}}</p>
    </div>

    <div v-else>
      <h4 v-on:click="toggleNotes"><i class="far fa-sticky-note"></i> Notes</h4>
    </div>

    <!-- Action Items -->
    <div v-if="showActionItems">
      <div class="agenda-action-items">
        <div class="action-item" v-for="action in this.agendaItem.tasks">
          <input type="checkbox">
          <div class="action-item-text">
            <p contenteditable="true" class="action-item-description">{{action.description}}</p>
            <p contenteditable="true" class="due-date">{{action.dueDate}}</p>
          </div>
          <div class="assignees">
            <div v-if="!showAssignees" class="assignee-photo" v-for="assignee in action.assignees" :style="{ 'background-image': 'url(' + assignee.avatar + ')' }"></div>
            <i class="fas fa-user-plus"></i>
          </div>
        </div>
        <div class="action-item">
          <input type="checkbox" disabled>
          <div class="action-item-text">
            <p contenteditable="true" class="start-typing-description">Start typing…</p>
            <p contenteditable="true" class="start-typing-due-date">due…</p>
          </div>
          <div class="assignees">
            <i class="fas fa-user-plus"></i>
            <!-- Still need to add the modal for finding someone -->
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <h4 v-on:click="toggleActionItems"><i class="far fa-tasks"></i> Action Items</h4>
    </div>

  </div>
</template>

<script>
export default {
  name:"agenda-item",
  data:function(){
    return {
      showNotes: false,
      showActionItems: false
    }
  },
  props: {
    agendaItem: Object,
    meeting: Object
  },
  methods:{
    toggleNotes:function(){
      this.showNotes = !this.showNotes
    },
    toggleActionItems:function(){
      this.showActionitems = !this.showActionItems
    }
  },
  computed: {

  }
}
</script>
