<template>
  <div class="agenda-item">
    <input class="editable agenda-item-title" type="text" placeholder="A very important topic" v-model="this.agendaItem.title"></input>
    <textarea
            class="editable agenda-item-description"
            contenteditable="true"
            placeholder="What’s this about?"
            v-model='this.agendaItem.description'
    >
    </textarea>

    <!-- Notes -->
    <h3>Notes</h3>
    <textarea
            class="editable agenda-item-note"
            contenteditable="true"
            placeholder="Jot something down…"
            v-model='this.agendaItem.notes'
    >
    </textarea>


    <!-- Action Items -->
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
</template>

<script>
export default {
  name:"agenda-item",
  data:function(){
    return {

    }
  },
  props: {
    agendaItem: Object,
    meeting: Object
  },
  methods:{

  },
  computed: {

  },
  mounted:function(){
    console.log(this.agendaItem);
  }
}
</script>
