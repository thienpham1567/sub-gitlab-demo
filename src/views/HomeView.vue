<template>
  <main>

    <div class="content-container">
      <RouterView />
    </div>

  </main>
</template>

<script setup>
import { RouterView } from 'vue-router';

</script>

<style lang="scss">
.content-container {
  width: 100%;
  display: block;
  padding: .5rem 10rem;
  font-size: .9rem;
}
</style>