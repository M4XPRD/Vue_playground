<template>
  <div>
    <h1>Страница с постами через Composition API</h1>
    <my-input
      v-focus
      v-model="searchQuery"
      placeholder="Поиск..."
    />
    <div class="app-buttons">
      <my-button
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
      />
    </my-dialogue>
    <post-list
      :posts="sortedAndSearchedPosts"
      v-if="!arePostsLoading && !isLoadingError"
    />
    <h3 v-else-if="!isLoadingError">Идёт загрузка...</h3>
    <h3 v-else>Ошибка загрузки, перезагрузите страницу</h3>
  </div>
</template>

<script>
import PostForm from '../components/PostForm.vue';
import PostList from '../components/PostList.vue';
import MyButton from '../components/UI/MyButton.vue';
import MySelect from '../components/UI/MySelect.vue';
import MyInput from '../components/UI/MyInput.vue';
import usePosts from '../hooks/usePosts';
import useSortedPosts from '../hooks/useSortedPosts';
import useSortedAndSearchedPosts from '../hooks/useSortedAndSearchedPosts';

export default {
  components: {
    MyButton,
    MySelect,
    MyInput,
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogueVisible: false,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По описанию' },
      ],
    };
  },
  setup() {
    const {
      posts, totalPages, arePostsLoading, isLoadingError,
    } = usePosts(10);

    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts);

    return {
      posts, totalPages, arePostsLoading, isLoadingError, selectedSort, searchQuery, sortedAndSearchedPosts,
    };
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
