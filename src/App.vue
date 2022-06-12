<template>
  <header>
    <Navigation />
  </header>
  <main>
    <div class="main-container">
      <aside class="sidebar sidebar-mobile" :class="{ collapsed: isCollapsed }">
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

.main-container {
  display: flex;
  width: 100%;
  height: 100%;

  .sidebar {
    width: 20%;
    transition: all 0.3s ease-in-out;
  }

  .view-pages {
    width: 100%;
  }
}

@media screen and (max-width:1200px) {
  .sidebar-mobile {
    width: 7% !important;
    transition: all 0.3s ease-in-out;

    .sidebar-container {

      .content-in-item {
        display: none;
      }

      .content {
        display: none;
      }
    }
  }
}
</style>
