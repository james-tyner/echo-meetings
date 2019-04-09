<template>
	<div class="card" v-bind:class="colorBand">
		<h3 class="card-team" v-bind:class="teamText">{{task.team.name}}</h3>
		<h2 class="card-heading">{{task.name}}</h2>
		<div class="card-icons">
		  <div class="icon-group"><i class="fas fa-user-circle"></i> {{task.assignees.length}}</div>
		  <!-- <div class="icon-group"><i class="fas fa-comment"></i> 5</div> -->
		  <div class="icon-group"><i class="fas fa-clock"></i> Due {{humanDate}}</div>
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
				var now = new Date(now);
				var dueDate = new Date(this.task.due);
			  var dateDiff = Math.abs(now.getTime() - dueDate.getTime());

			  dateDiff = dateDiff / (1000 * 60 * 60 * 24);

				var dueDateYear = dueDate.getYear();
				var thisYear = now.getYear();

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
