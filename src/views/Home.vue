<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{ list }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  computed: {
    ...mapGetters('specifications', {
      list: 'list',
    }),
  },
};
</script>
