<template>
	<div class="card" v-bind:class="colorBand">
		<h3 class="card-team" v-on:click="toggle()" v-bind:class="teamText">{{task.meeting.team.name}}</h3>
		<h2 class="card-heading" v-on:click="toggle()">{{task.name}}</h2>
		<div class="task-info" v-if="showAll">
      <!-- <p class="card-desc">{{task.description}}</p> -->
			<textarea
              class="editable team-desc"
              contenteditable="true"
              placeholder="Description"
              v-model='task.description'
      >
      </textarea>
			<p class="card-date" v-bind:class="{'red' : overdueColor}">{{humanDate}}</p>
      <div class="task-assignees">
				<p class="assignee-heading">Assigned to</p>
        <div v-for="assignee in task.assignees" class="assignee">
          <div class="profile-photo" :style="{ 'background-image' : 'url(' + task.meeting.team.members.find(person => person._id == assignee).avatar + ')'}"></div>
          <p class="member-name">{{task.meeting.team.members.find(person => person._id == assignee).name}}</p>
        </div>
      </div>
    </div>
    <div v-else v-on:click="toggle()" class="card-icons">
			<div class="icon-group"><i class="fas fa-user-circle"></i> {{task.assignees.length}}</div>
		  <!-- <div class="icon-group"><i class="fas fa-comment"></i> 5</div> -->
		  <div class="icon-group" v-bind:class="{'red' : overdueColor}"><i class="fas fa-clock" v-if="humanDate != ''"></i>{{humanDate}}</div>
    </div>

	</div>
</template>

<script>
	import debounce from 'lodash.debounce'
	import {task_data} from "../../data";
	import SaveAnimation from "../SaveAnimation"

  export default {
    name:"task-card",
    props:{
      task:Object
    },
		mixins:[SaveAnimation],
    computed:{
      colorBand:function(){
        return (this.task.meeting.team.color + '-color-band')
      },
      teamText:function(){
        return (this.task.meeting.team.color)
      },
			humanDate:function(){
				var now = Date.now();
				var dueDate = new Date(this.task.due);
			  var dateDiff = Math.abs(now - dueDate.getTime());

			  dateDiff = Math.ceil(dateDiff / (1000 * 60 * 60 * 24));

				var dueDateYear = moment(dueDate).format('YY');
				var thisYear = moment(now).format('YY');

				var dateFormatted;
				// if date is less than two weeks from now, say as "days from now" or "in XX days"
				// if date is more than two weeks from now, list month and day
				// if date is not in this year, list with year
				if (dateDiff > 14){
					if (dueDateYear != thisYear) {
						dateFormatted = moment(dueDate).format('MMM D, YYYY');
					} else {
						dateFormatted = moment(dueDate).format('MMM D');
					}
				} else {
					dateFormatted = moment(dueDate).fromNow();
				}

				if (dateFormatted != "Invalid date"){
	        return "due " + dateFormatted;
	      } else {
	        return ""
	      }
			},
			overdueColor:function(){
				var now = Date.now();
				var dueDate = new Date(this.task.due);
				dueDate = dueDate.getTime();

				if (now > dueDate){
					return true
				} else {
					return false
				}
			}
    },
    methods:{
      toggle(){
        this.showAll = !this.showAll
      },
			updateDescription(description, old) {
	      if (this.lastSavedDescription === description) return;
	      this.lastSavedDescription = description;
	      task_data.update(this.task._id, null, null, null, description)
				this.animateSave();
	    }
    },
    data:function(){
      return {
        showAll:false,
				lastSavedDescription:this.task.description
      }
    },
		watch: {
	    task: {
	      handler: function (val, oldVal) {
	        this.debouncedUpdateDescription(val.description, oldVal.description)
	      },
	      deep: true
	    }
	  },
		created: function () {
	    this.debouncedUpdateDescription = debounce(this.updateDescription, 1000)
	  }
  }
</script>
