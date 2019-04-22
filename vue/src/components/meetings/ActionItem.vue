<template>
  <div class="action-item">
    <div class="action-item-text">
      <p contenteditable="true" class="action-item-description">{{action.name}}</p>
      <input :id="'action-item-due-date-' + action._id" class="editable start-typing-due-date" type="text" v-on:keydown="modifyTaskTime($event, action.status, action._id)" placeholder="due…" v-tooltip="{
      offset: '5',
      hideOnTargetClick: false,
      content:taskDateTooltip,
      trigger:'manual',
      show:taskDateTooltip
      }">
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
</template>

<script>
import { meeting_data, task_data } from '../../data'
import MemberSearch from "../../components/meetings/MemberSearchItem"
import AnimateSave from "../SaveAnimation"

const chrono = require("chrono-node");

export default {
  name:"action-item",
  props:{
    action:Object,
    meeting:Object,
    agendaItem:Object
  },
  components:{
    MemberSearch
  },
  data:function(){
    return {
      focused_removing_assignee: '',
      focused_task: '',
      selected_assignee: {},
      MemberSearchTemplate: MemberSearch,
      taskDateTooltip:false
    }
  },
  computed: {
    availableMembers() {
      if (!this.meeting) {
        return [];
      } else {
        return this.meeting.invitees;
      }
    },
    actionDueDate:function(){
      if (!this.action.due){
        return null;
      } else {
        return moment(this.action.due).format("ddd, MMM D [at] h:mm a");
      }
    }
  },
  mixins: [AnimateSave],
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
  methods:{
    getLabel(item) {
      if (!item) return '';
      return item.name
    },
    modifyTaskTime: function (event, taskStatus, taskId) {
      let taskDateTime = event.target.value;
      var parsedDateTime;
      var jsDate;
      var readableDate;

      // Will fire on every keypress when entry is 3 or more characters
      if (taskDateTime.length >= 3){
        clearTimeout(hideTooltipTimeout);
        parsedDateTime = chrono.en.parseDate(taskDateTime);
        jsDate = new Date(parsedDateTime);
        readableDate = moment(parsedDateTime).format("ddd, MMM D [at] h:mm a")
        console.log("new unix " + this.currentTaskInput);
        this.taskDateTooltip = readableDate;
        let hideTooltipTimeout = setTimeout(() => {
          this.taskDateTooltip = false;
        }, 2500)
      }

      // Will fire when user hits enter
      if (event.keyCode === 13 && taskDateTime.length > 0) {
        event.target.value = readableDate;
        event.target.blur();
        
        // save new due date to task
        let unixDate = moment(readableDate, "ddd, MMM D [at] h:mm a").valueOf();
        task_data.update(taskId, taskStatus, unixDate);
      }
    },
    deleteTask: function (task_id) {
      task_data.delete(task_id);
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
  mounted: function () {
    window.addEventListener('click', this.handleClick);
    if (this.action.due){
      document.getElementById('action-item-due-date-' + this.action._id).value = moment(this.action.due).format("ddd, MMM D [at] h:mm a");
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('click', this.handleClick)
  }
}
</script>
