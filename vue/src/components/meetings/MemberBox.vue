<template>
  <div class="member-box">
    <div class="member-box__wrapper">
      <div class="profile-photo"
           :style="{ 'background-image': 'url(' + member.avatar + ')' }"></div>
      <span class="member-name">{{member.name}}</span>
      <i v-if="editable" class="material-icons member-delete" @click="onClickClose">close</i>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmailBox",
  props: {
    member: Object,
    editable: Boolean,
  },
  methods: {
    onClickClose() {
      this.$emit('delete-member', this)
    }
  }
}
</script>

<style lang="scss">
  .member-box {
    margin-right: .33333333em;
    padding: 0;
    vertical-align: baseline;
  }

  .member-box__wrapper {
    align-items: center;
    background-color: #fff;
    border: 1px solid #dadce0;
    border-radius: 1.1em;
    box-sizing: border-box;
    display: inline-flex;
    height: 2.2em;
    line-height: 20px;
    margin: 2px 0;
    padding-left: 3px;
    padding-right: 6px;

    .profile-photo {
      background-size: cover;
      background-position: center;
      width: 1.8em;
      height: 1.8em;
      margin-right: 0.4em;
      border-radius: 1.8em;
    }

    .member-name {
      margin-right: 5px;
    }
  }

  .member-delete {
    font-size: 16px;
    cursor: pointer;
    color: #5f6368;
  }
</style>
