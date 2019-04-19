<template>
  <div id="person-search">
    <i class="fa fa-search" aria-hidden="true" ></i>
    <input id="search" type="text" name="name" placeholder="Find someone…"></input>
  </div>
</template>

<script>
export default {
  name:"add-team-member",
  props:{
    people:Array
  },
  data:function(){
    return {
      showOverlay:false
    }
  },
  mounted:function(){
    var self = this; // so you can refer to the Vue instance within nested functions
    let autocompletePeople = []
    for (var i=0; i < self.people.length; i++){
      autocompletePeople.push({
        "label":self.people[i].name,
        "value":self.people[i].id
      });
    }

    $('#search').autocomplete({
      source: autocompletePeople,
      minLength: 2,
      select: function(event, ui) {
        $("#search").val(ui.item.value);
      }
    });
  }
}
</script>
