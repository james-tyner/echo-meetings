<template>
  <div id="team-search">
    <i class="fa fa-search" aria-hidden="true" ></i>
    <input type="text" name="name" placeholder="Search for a team..." ></input>
  </div>
</template>

<script>
export default {
  name:"add-team",
  props:{
    teams:Array
  },
  data:function(){
    return {
      showOverlay:false
    }
  },
  mounted:function(){
    var self = this; // so you can refer to the Vue instance within nested functions
    let autocompleteTeams = []
    for (var i=0; i < self.teams.length; i++){
      autocompleteTeams.push({
        "label":self.teams[i].name,
        "value":self.teams[i].id
      });
    }
    $('#search').autocomplete({
      source: autocompleteTeams,
      minLength: 2,
      select: function(event, ui) {
        $("#search").val(ui.item.value);
      }
    });
  }
}
</script>