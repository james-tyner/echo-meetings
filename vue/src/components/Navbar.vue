<template>
  <div class="nav">
    <h1>Menu Items</h1>
    <p v-for="item in items" :key="item.id">{{ item.msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    items: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
