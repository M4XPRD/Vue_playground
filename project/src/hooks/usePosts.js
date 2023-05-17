import axios from 'axios';
import { onMounted, ref } from 'vue';

function usePosts(limit) {
  const posts = ref([]);
  const totalPages = ref(0);
  const arePostsLoading = ref(true);
  const isLoadingError = ref(false);
  const fetching = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _page: 1,
          _limit: limit,
        },
      });
      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
      posts.value = response.data;
    } catch (e) {
      isLoadingError.value = true;
    } finally {
      arePostsLoading.value = false;
    }
  };
  onMounted(fetching);
  return {
    posts, totalPages, arePostsLoading, isLoadingError,
  };
}

export default usePosts;
