import { computed, ref } from 'vue';

function useSortedPosts(sortedPosts) {
  const searchQuery = ref('');

  const sortedAndSearchedPosts = computed(() => sortedPosts.value
    .filter((post) => post.title.toLowerCase().includes(searchQuery.value.toLowerCase())));

  return {
    searchQuery, sortedAndSearchedPosts,
  };
}

export default useSortedPosts;
