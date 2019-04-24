<template>
  <div class="member-item">
    <div class="profile-photo"
         :style="{ 'background-image': 'url(' + item.avatar + ')' }"
    ></div>
    <p>{{item.name}}</p>
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
  .member-item {
    display: flex;

    p {
      margin: 0;
      padding-top: 3px;
    }

    .profile-photo {
      background-size: cover;
      background-position: center;
      width: 1.8em;
      height: 1.8em;
      margin-right: 0.4em;
      border-radius: 1.8em;
    }
  }
</style>
