<template>
  <header class="nav-header">
    <Navigation />
  </header>
  <main>
    <div class="main-container">
      <aside class="sidebar sidebar-mobile"
        :class="{ collapsed: isCollapsed, 'toggle-sidebar-mobile': store.getters.toggleSidebar }">
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
import { useStore } from 'vuex';

const store = useStore();
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

.header-nav {
  position: fixed;
  z-index: 99;
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
  .main-container {
    .sidebar {
      width: 7%;
      transition: all 0.2s ease-in-out;

      .sidebar-container {
        .list-sidebar {
          .content-in-item {
            visibility: hidden;
          }

          .content {
            display: none;
          }
        }

        .collapse-btn {
          .content {
            display: none;
          }
        }
      }
    }
  }
}

@media screen and (max-width:767px) {
  .main-container {
    .sidebar {
      background-color: rgba(0, 0, 0, 0.2);
      position: fixed;
      top: 0;
      width: 100%;
      left: -100%;
      z-index: 2;

      .sidebar-container {
        width: 55%;

        .list-sidebar {
          li {
            width: 100%;
          }

          .content-in-item {
            visibility: visible;
          }

          .content {
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
}

.main-container {
  .toggle-sidebar-mobile {
    left: 0;
  }
}
</style>
