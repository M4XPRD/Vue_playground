<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
      v-focus
      v-model="searchQuery"
      placeholder="Поиск..."
    >
  </my-input>
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
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!-- <div class="page-wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{
          'current-page': pageNumber === page
        }"
        @click="changePage(pageNumber)"
      >
      {{ pageNumber }}
      </div>
    </div> -->
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
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По описанию' },
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
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
    async fetchPosts() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        this.isLoadingError = true;
      } finally {
        this.arePostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        this.isLoadingError = true;
      }
    },
  },
  mounted() {
    this.isLoadingError = false;
    this.fetchPosts();
    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0,
    // };
    // const callback = (entries) => {
    //   const [observerEntry] = entries;
    //   const loadedPagesLimit = this.page < this.totalPages;
    //   if (observerEntry.isIntersecting && loadedPagesLimit) {
    //     this.loadMorePosts();
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      return [...this.posts]
        .sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts
        .filter((post) => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // },
  },
};
</script>

<style>
.app-buttons {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.page-wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
  background: green;
}
</style>
