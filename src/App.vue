<template>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';

const store = useStore();


</script>

<style lang="scss">
* {
  font-family: Poppins, sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
