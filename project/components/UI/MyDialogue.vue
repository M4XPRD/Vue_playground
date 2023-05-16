<template>
  <div class="dialogue" v-if="show" @click.stop="hideDialogue">
    <div class="dialogue-content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-dialogue',
  props: {
    show: {
      true: Boolean,
      default: false,
    },
  },
  methods: {
    hideDialogue() {
      this.$emit('update:show', false);
    },
  },
};
</script>

<style scoped>
  .dialogue {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
  }
  .dialogue-content {
    margin: auto;
    background: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    padding: 20px;
  }
</style>
