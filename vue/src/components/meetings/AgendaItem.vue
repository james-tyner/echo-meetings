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
      <div class="action-item" v-for="action in agendaItem.tasks" v-bind:key="action._id">
        <input disabled type="checkbox" v-on:change="changeTaskStatus(action._id)">
        <div class="action-item-text">
          <p contenteditable="true" class="action-item-description">{{action.name}}</p>
          <p v-if="action.due" contenteditable="true" class="due-date">{{action.due | humanDate}}</p>
          <input v-else class="editable start-typing-due-date" type="datetime-local"
                 v-on:change="modifyTaskTime(action._id)" v-model="action.due" placeholder="due…">
        </div>
        <div class="assignees">
          <div
            class="assignee-photo assignee-photo__task"
            v-for="assignee in action.assignees"
            :class="focused_removing_assignee===action._id + assignee._id ? 'danger' : ''"
            @click="onRemovingAssignee(action._id, assignee._id)"
            :style="{ 'background-image': 'url(' + assignee.avatar + ')' }"
            v-tooltip="{
            offset: '5',
            hideOnTargetClick: false,
            content: focused_removing_assignee===action._id + assignee._id ? 'Click again to remove from assignee' : 'Click twice to remove from assignee',
            classes: focused_removing_assignee===action._id + assignee._id ? 'danger-bg' : ''
            }"
          ></div>
          <i class="fas fa-user-plus" @click="focused_task = action._id"></i>
          <i class="far fa-trash-alt" v-on:click="deleteTask(action._id)"></i>
        </div>
        <v-autocomplete
          v-if="focused_task===action._id"
          v-model="selected_assignee[action._id]"
          :items="availableMembers"
          :component-item="MemberSearchTemplate"
          :get-label="getLabel"
          class="select-assignee"
          :auto-select-one-item="false"
          keep-open
        ></v-autocomplete>
      </div>
      <div class="action-item">
        <input type="checkbox" disabled>
        <div class="action-item-text">
          <input class="editable start-typing-description" type="text" placeholder="Add a task…"
                 v-on:keydown="createNewTask">
          <!-- <input class="editable start-typing-due-date" type="datetime-local" v-on:change="modifyTaskTime" placeholder="due…"></input> -->
        </div>
        <div class="assignees">
          <!-- <i class="fas fa-user-plus"></i> -->
          <!-- Still need to add the modal for finding someone -->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { meeting_data, task_data } from '../../data'
import AnimateSave from "../SaveAnimation"
import MemberSearch from "../../components/meetings/MemberSearchItem"
import showAlert from "../ShowAlert"

export default {
  name: "agenda-item",
  components: {
    MemberSearch
  },
  data: function () {
    return {
      focused_removing_assignee: '',
      focused_task: '',
      selected_assignee: {},
      meeting_data: meeting_data,
      task_data: task_data,
      MemberSearchTemplate: MemberSearch
    }
  },
  watch: {
    selected_assignee: {
      handler: function (val) {
        const task_id = this.focused_task;
        if (task_id && val[task_id]) {
          const user = val[task_id];
          // add assignees
          for (let i = 0; i < this.agendaItem.tasks.length; i++) {
            const task = this.agendaItem.tasks[i];
            if (task._id !== task_id) continue;
            const assignees = task.assignees.map(m => m._id);
            if (assignees.includes(user._id)) {
              console.log('included');
              showAlert('red', 'This member is already assigned');
            } else {
              console.log('ok');
              assignees.push(user._id);
              // this.agendaItem.tasks[i].assignees.push(user._id);
              task_data.update(task_id, null, null, null, null, assignees);
            }
          }
          this.$nextTick(function () {
            this.selected_assignee[task_id] = undefined;
          });
          this.focused_task = '';
        }
      },
      deep: true
    }
  },
  props: {
    agendaItem: Object,
    meeting: Object
  },
  mixins: [AnimateSave],
  computed: {
    availableMembers() {
      if (!this.meeting) {
        return [];
      } else {
        return this.meeting.invitees;
      }
    }
  },
  methods: {
    getLabel(item) {
      if (!item) return '';
      return item.name
    },
    createNewTask: function (event) {
      let taskName = event.target.value;
      // Will fire when user hits enter
      if (event.keyCode === 13 && taskName.length >= 0 && taskName.length != null) {
        task_data.create(this.meeting._id, this.agendaItem._id, taskName)
        event.target.value = "";
      }
    },
    modifyTaskTime: function (event, task_id) {
      // Will fire only once date and time are fully filled

      // Task API currently doesn't accept date/times as parameters on either create or update
    },
    changeTaskStatus: function (event, task_id) {
      let taskStatus;
      if (event.target.checked) {
        taskStatus = 2;
        task_data.update(task_id, taskStatus);
        this.animateSave();
      }
    },
    deleteItem: function () {
      meeting_data.agenda.delete(this.meeting._id, this.agendaItem._id, this.agendaItem.title)
    },
    deleteTask: function (task_id) {
      task_data.delete(task_id);
    },
    updateItem: function () {
      var self = this;
      var updateTimer;
      if (updateTimer) {
        clearTimeout(updateTimer);
      }
      updateTimer = setTimeout(() => {
        meeting_data.agenda.update(self.meeting._id, self.agendaItem._id, self.agendaItem.title, self.agendaItem.description, self.agendaItem.notes);
        self.animateSave();
      }, 750)
    },
    updateTask: function () {
      var self = this;
      var updateTimer;
      if (updateTimer) {
        clearTimeout(updateTimer);
      }
      updateTimer = setTimeout(() => {
        task_data.update()
        self.animateSave();
      })
    },
    handleClick: function (event) {
      if (event.target && !event.target.classList.contains('fa-user-plus')) {
        let count = 0;
        let current_node = event.target;
        let found = false;
        while (count++ < 3) {
          if (!current_node) break;
          if (current_node.classList.contains('v-autocomplete-input-group')
            || current_node.classList.contains('member-item')
            || current_node.classList.contains('v-autocomplete-list')) {
            found = true;
            break;
          }
          current_node = event.target.parentElement;
        }
        if (!found) {
          this.focused_task = '';
        }
      }
      if (event.target && !event.target.classList.contains('assignee-photo')) {
        this.focused_removing_assignee = '';
      }
    },
    onRemovingAssignee: function (task_id, member_id) {
      if (this.focused_removing_assignee === task_id + member_id) {
        // second click
        for (let i = 0; i < this.agendaItem.tasks.length; i++) {
          const task = this.agendaItem.tasks[i];
          if (task._id !== task_id) continue;
          const assignees = task.assignees.map(m => m._id);
          for (let j = 0; j < assignees.length; j++) {
            if (assignees[j] === member_id) {
              assignees.splice(j, 1);
              this.agendaItem.tasks[i].assignees.splice(j, 1);
              break;
            }
          }
          task_data.update(task_id, null, null, null, null, assignees);
        }
      } else {
        // first click
        this.focused_removing_assignee = task_id + member_id;
      }
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

      if (dateDiff > 5) {
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
  mounted: function () {
    window.addEventListener('click', this.handleClick)
  },
  beforeDestroy: function () {
    window.removeEventListener('click', this.handleClick)
  }
}
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