<template>
  <header v-bind:class="{scrollable : scrollableHeader}">

    <!-- Add buttons must go above the heading -->
      <!-- Teams -->
      <div v-if="pageName === 'Teams'" class="add-button align-right">
        <router-link to="teams/add"><i class="material-icons"> add </i></router-link>
      </div>

      <!-- Meetings -->
      <div v-if="pageName === 'Meetings'" class="add-button align-right">
        <router-link to="meetings/add"><i class="material-icons"> add </i></router-link>
      </div>

    <!-- Save animation icon (must stay above heading) -->
    <div id="save-animation">
      Saved <img src="~@/assets/Spark.svg">
    </div>

    <h1 class="page-title">{{pageName}}</h1>

    <!-- Filter bars must go below the heading -->
      <!-- Meetings -->
      <!-- <FilterBar v-if="pageName == 'Meetings'"></FilterBar> -->

  </header>
</template>

<script>

export default {
  name: 'Header',
  computed: {
    scrollableHeader:function(){
      if (this.pageName === 'Teams' || this.pageName === "Meetings") {
        return true
      }
    }
  },
  props: {
    pageName: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
