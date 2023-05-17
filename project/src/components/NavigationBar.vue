<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue3</div>
    <div class="navbar-buttons">
      <my-button @click="$router.push('/posts')">Посты</my-button>
      <my-button @click="$router.push('/about')" style="margin-left: 20px;">О сайте</my-button>
      <my-button @click="$router.push('/store')" style="margin-left: 20px;">Состояние</my-button>
      <my-button @click="$router.push('/composition')" style="margin-left: 20px;">Композиция</my-button>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
  .navbar {
    height: 50px;
    background-color: lightcyan;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
  }

  .navbar-buttons  {
    margin-left: auto;

  }
</style>
