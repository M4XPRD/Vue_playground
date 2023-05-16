<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-button
      @click="showDialogue"
      style="margin: 15px 0;"
    >
      Создать пост
    </my-button>
    <my-dialogue
      v-model:show="dialogueVisible"
    >
      <post-form
        @create="createPost"
      />
    </my-dialogue>
    <post-list
      @remove="removePost"
      :posts="posts"
      v-if="!arePostsLoading && !isLoadingError"
    />
    <h3 v-else-if="!isLoadingError">Идёт загрузка...</h3>
    <h3 v-else>Ошибка загрузки, перезагрузите страницу</h3>
  </div>
</template>

<script>
import axios from 'axios';
import PostList from '../components/PostList.vue';
import PostForm from '../components/PostForm.vue';

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [],
      dialogueVisible: false,
      arePostsLoading: false,
      isLoadingError: false,
    };
  },
  methods: {
    createPost(post) {
      this.posts.unshift(post);
      this.dialogueVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialogue() {
      this.dialogueVisible = true;
    },
    async fetchUsers() {
      try {
        this.arePostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
        this.posts = response.data;
      } catch (e) {
        this.isLoadingError = true;
      } finally {
        this.arePostsLoading = false;
      }
    },
  },
  mounted() {
    this.isLoadingError = false;
    this.fetchUsers();
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
