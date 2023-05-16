<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-button
      @click="showDialogue"
      style="margin: 15px 0;"
    >
      Создать пользователя
    </my-button>
    <my-dialogue v-model:show="dialogueVisible">
      <post-form @create="createPost" />
    </my-dialogue>
    <post-list @remove="removePost" :posts="posts" />
  </div>
</template>

<script>
import PostList from '../components/PostList.vue';
import PostForm from '../components/PostForm.vue';

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [
        { id: 1, title: 'JavaScript 1', body: 'Описание поста 1' },
        { id: 2, title: 'JavaScript 2', body: 'Описание поста 2' },
        { id: 3, title: 'JavaScript 3', body: 'Описание поста 3' },
        { id: 4, title: 'JavaScript 4', body: 'Описание поста 4' },
      ],
      dialogueVisible: false,
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogueVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialogue() {
      this.dialogueVisible = true;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
</style>
