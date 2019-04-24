<template>
  <div class="email-box">
    <div class="email-box__wrapper">
      <span class="email">{{ email }}</span>
      <i v-if="editable" class="material-icons email-delete" @click="onClickClose">close</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmailBox',
  props: {
    email: String,
    editable: Boolean,
  },
  methods: {
    onClickClose() {
      this.$emit('delete-email', this);
    },
  },
};
</script>

<style lang="scss" scoped>
  .email-box {
    margin-right: .33333333em;
    padding: 0;
    vertical-align: baseline;
  }

  .email-box__wrapper {
    align-items: center;
    background-color: #fff;
    border: 1px solid #dadce0;
    border-radius: 12px;
    box-sizing: border-box;
    display: inline-flex;
    height: 24px;
    line-height: 20px;
    margin: 2px 0;
    padding-left: 10px;
    padding-right: 6px;
  }

  .email {
    font-size: .75rem;
    letter-spacing: .3px;
    box-sizing: border-box;
    color: #5f6368;
    font-weight: 500;
    margin: 0;
    max-height: 20px;
    display: inline-block;
    padding-right: 5px;
  }

  .email-delete {
    font-size: 16px;
    cursor: pointer;
    color: #5f6368;
  }
</style>
