<template>
  <header>
    <Navigation />
  </header>
  <main>
    <div class="main-container">
      <aside :class="{ collapsed: isCollapsed }" class="sidebar">
        <Sidebar :isCollapsed="isCollapsed" @collapsedSidebar="collapsed" />
      </aside>
      <div class="view-pages">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<script setup>
import Navigation from './components/Navigation.vue';
import Sidebar from './components/Sidebar.vue';
import { RouterView } from 'vue-router'
import { ref } from 'vue';

const isCollapsed = ref(false);

const collapsed = () => {
  console.log("App.vue");
  isCollapsed.value = !isCollapsed.value;
}

</script>

<style lang="scss">
* {
  font-family: Poppins, sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: normal;
}

header {}

.main-container {
  display: flex;
  width: 100%;

  .sidebar {
    width: 20%;
    transition: all 0.3s ease-in-out;
  }

  .view-pages {
    width: 100%;
  }
}
</style>
