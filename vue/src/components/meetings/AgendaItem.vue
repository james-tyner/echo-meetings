<template>
  <div class="agenda-item">
    <div class="agenda-icon-tray">
      <i class="far fa-trash-alt" v-on:click="deleteItem"></i>
    </div>
    <input class="editable agenda-item-title" type="text" placeholder="A very important topic"
           v-model="agendaItem.title" v-on:change="updateItem">
    <textarea
      class="editable agenda-item-description"
      contenteditable="true"
      placeholder="What’s this about?"
      v-model='agendaItem.description'
      v-on:change="updateItem"
    >
    </textarea>

    <!-- Notes -->
    <h3>Notes</h3>
    <textarea
      class="editable agenda-item-note"
      contenteditable="true"
      placeholder="Jot something down…"
      v-model='agendaItem.notes'
      v-on:change="updateItem"
    >
    </textarea>


    <!-- Action Items -->
    <div class="agenda-action-items">
      <ActionItem v-for="action in agendaItem.tasks" v-bind:action="action" v-bind:meeting="meeting" v-bind:agendaItem="agendaItem" v-bind:key="action._id"></ActionItem>

      <div class="action-item">
        <div class="action-item-text">
          <input class="editable start-typing-description" type="text" placeholder="Add a task…"
                 v-on:keydown="createNewTask">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { meeting_data, task_data } from '../../data';
import AnimateSave from '../SaveAnimation';
import ActionItem from './ActionItem.vue';

export default {
  name: 'agenda-item',
  components: {
    ActionItem,
  },
  data() {
    return {
      meeting_data,
      task_data,
    };
  },
  props: {
    agendaItem: Object,
    meeting: Object,
  },
  mixins: [AnimateSave],
  methods: {
    deleteItem() {
      meeting_data.agenda.delete(this.meeting._id, this.agendaItem._id, this.agendaItem.title);
    },
    updateItem() {
      const self = this;
      let updateTimer;
      if (updateTimer) {
        clearTimeout(updateTimer);
      }
      updateTimer = setTimeout(() => {
        meeting_data.agenda.update(self.meeting._id, self.agendaItem._id, self.agendaItem.title, self.agendaItem.description, self.agendaItem.notes);
        self.animateSave();
      }, 750);
    },
    createNewTask(event) {
      const taskName = event.target.value;
      // Will fire when user hits enter
      if (event.keyCode === 13 && taskName.length >= 0 && taskName.length != null) {
        task_data.create(this.meeting._id, this.agendaItem._id, taskName);
        event.target.value = '';
      }
    },
  },
};
</script>

<style lang="scss">
  .assignee-photo__task {
    cursor: pointer;

    &.danger {
      filter: grayscale(100%);
    }
  }

  .tooltip {
    &.danger-bg .tooltip-inner {
      background: #f53900;
    }

    transition: 0s;

    .tooltip-inner {
      background: black;
      color: white;
      font-size: .8rem;
      border-radius: 16px;
      padding: 5px 10px 4px;
    }
  }

  .action-item {
    position: relative;
  }

  .v-autocomplete.select-assignee {
    z-index: 10;
    top: 50px;
    right: 0;
    width: 200px;
    position: absolute;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .v-autocomplete-list {
      z-index: 11;
      border: none;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .v-autocomplete-input-group {

      .v-autocomplete-input {
        font-size: .8em;
        padding: 10px 15px;
        box-shadow: none;
        border: none;
        background-color: #f9f9f9;
      }
    }

    .v-autocomplete-list-item {
      cursor: pointer;
      background-color: #fff;
      padding: 8px;
      border: none
    }
  }


</style>
