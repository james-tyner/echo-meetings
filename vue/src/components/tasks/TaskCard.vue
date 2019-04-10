<template>
	<div class="card" v-bind:class="colorBand">
		<h3 class="card-team" v-on:click="toggle()" v-bind:class="teamText">{{task.team.name}}</h3>
		<h2 class="card-heading" v-on:click="toggle()">{{task.name}}</h2>
		<div class="task-info" v-if="showAll">
      <p class="card-desc">{{task.description}}</p>
			<p class="card-date" v-bind:class="{'red' : overdueColor}">due {{humanDate}}</p>
      <div class="task-assignees">
				<p class="assignee-heading">Assigned to</p>
        <div v-for="assignee in task.assignees" class="assignee">
          <div class="profile-photo" :style="{ 'background-image' : 'url(' + assignee.avatar + ')'}"></div>
          <p class="member-name">{{assignee.name}}</p>
        </div>
      </div>
    </div>
    <div v-else v-on:click="toggle()" class="card-icons">
			<div class="icon-group"><i class="fas fa-user-circle"></i> {{task.assignees.length}}</div>
		  <!-- <div class="icon-group"><i class="fas fa-comment"></i> 5</div> -->
		  <div class="icon-group" v-bind:class="{'red' : overdueColor}"><i class="fas fa-clock"></i> due {{humanDate}}</div>
    </div>

	</div>
</template>

<script>
  export default {
    name:"task-card",
    props:{
      task:Object
    },
    computed:{
      colorBand:function(){
        return (this.task.team.color + '-color-band')
      },
      teamText:function(){
        return (this.task.team.color)
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

				return dateFormatted;
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
      }
    },
    data:function(){
      return {
        showAll:false
      }
    }
  }
</script>
