<template>
  <div class="content-container">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';

</script>

<style lang="scss">
.content-container {
  width: 100%;
  display: block;
  margin: 0 auto;
  padding: .5rem 7rem;
  font-size: .9rem;
}

@media screen and (max-width:1632px) {
  .content-container {
    width: 100%;
    padding: .5rem 1rem;
  }
}
</style>