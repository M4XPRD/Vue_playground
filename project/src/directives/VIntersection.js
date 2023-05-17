export default {
  mounted(el, binding) {
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };
    const callback = (entries) => {
      const [observerEntry] = entries;
      if (observerEntry.isIntersecting) {
        binding.value();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  },
  name: 'intersection',
};
