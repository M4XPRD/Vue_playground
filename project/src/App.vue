<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-input v-model="searchQuery" placeholder="Поиск..."></my-input>
    <div class="app-buttons">
      <my-button
      @click="showDialogue"
    >
      Создать пост
    </my-button>
    <my-select
      v-model="selectedSort"
      :options="sortOptions"
    />
    </div>
    <my-dialogue
      v-model:show="dialogueVisible"
    >
      <post-form
        @create="createPost"
      />
    </my-dialogue>
    <post-list
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
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
      selectedSort: '',
      searchQuery: '',
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По описанию' },
        { value: 'id', name: 'По id' },
      ],
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
  computed: {
    sortedPosts() {
      if (this.selectedSort === 'id') {
        const sortID = [...this.posts]
          .sort((post1, post2) => post1.id - post2.id);
        return sortID;
      }
      const sortElse = [...this.posts]
        .sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
      return sortElse;
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts
        .filter((post) => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
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

.app-buttons {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>
