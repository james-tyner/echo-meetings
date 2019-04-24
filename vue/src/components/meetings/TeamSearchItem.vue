<template>
  <div class="team-item">
    <p>{{item.name}}</p>
    <div class="team-photos">
      <div class="profile-photo" v-for="member in item.members"
           :style="{ 'background-image': 'url(' + member.avatar + ')' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'team-search-item',
  props: {
    item: { required: true },
    searchText: { required: true },
  },
};
</script>

<style lang="scss">
  .team-item p {
    margin: 0;
  }
  .team-photos {
    display: flex;
    flex-wrap: nowrap;
    margin-top: 0.5em;
    margin-bottom: 0.3em;
  }
  .profile-photo {
    background-size: cover;
    background-position: center;
    width: 1.8em;
    height: 1.8em;
    margin-right: 0.4em;
    border-radius: 1.8em;
  }
</style>
