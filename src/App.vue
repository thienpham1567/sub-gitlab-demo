<template>
  <header class="nav-header">
    <Navigation />
  </header>
  <main>
    <div class="main-container">
      <aside class="sidebar" :class="{ 'toggle-sidebar-mobile': store.getters.toggleSidebar }">
        <Sidebar :isCollapsed="isCollapsed" @collapsedSidebar="collapsed" @changeIconCollapsed="changeCollapsed" />
      </aside>
      <div class="view-pages" :class="{ 'change-width-page': isCollapsed }">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<script setup>
import Navigation from './components/Navigation.vue';
import Sidebar from './components/Sidebar.vue';
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isCollapsed = ref(false);
const widthPage = ref();

onMounted(() => {
  window.addEventListener("resize", getCurrentWidthPage)
});

const collapsed = () => {
  isCollapsed.value = !isCollapsed.value;
}

const changeCollapsed = () => {
  isCollapsed.value = true
}

const getCurrentWidthPage = () => {
  widthPage.value = window.innerWidth;
  if (widthPage.value >= 1200) {
    isCollapsed.value = false;
  }
}

</script>

<style lang="scss">
* {
  font-family: Poppins, sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.header-nav {
  position: fixed;
  z-index: 99;
}

.main-container {
  position: relative;
  top: 3.5rem;

  .sidebar {
    width: 20%;
  }

  .view-pages {
    width: 100%;
    padding: .5rem 0;
    font-size: .825rem;
    padding-right: 4%;
    padding-left: 23%;
    transition: padding-left .3s;
  }

}

main {
  .main-container {
    .toggle-sidebar-mobile {
      left: 0 !important;
    }
  }
}

main {
  .main-container {
    .change-width-page {
      padding-left: 7rem;
      transition: padding-left .3s;
    }
  }
}

@media screen and (max-width:1632px) {
  .main-container {

    .view-pages {
      padding-left: 19%;
      padding-right: 1rem;
    }
  }
}

@media screen and (max-width:1200px) {
  main {
    .main-container {
      .sidebar {
        .sidebar-container {
          .list-sidebar {
            .content-in-item {
              visibility: hidden;
            }

            .content {
              display: none;
            }
          }
        }

        .collapse-btn {
          .content {
            display: none;
          }
        }
      }

      .view-pages {
        padding-left: 5rem;
      }
    }
  }
}

@media screen and (max-width:767px) {
  main {
    .main-container {
      .sidebar {
        background-color: rgba(0, 0, 0, 0.2);
        position: fixed;
        top: 3.4rem;
        left: -100%;
        width: 100%;

        z-index: 2;

        .sidebar-container {
          width: 60%;

          .list-sidebar {
            li {
              width: inherit;

              .item-sidebar {
                .content {
                  display: flex;
                  justify-content: space-between;
                }
              }
            }

            .tooltip-issues {
              width: 100%;

              .content-in-item {
                visibility: visible;
              }

            }
          }

          .collapse-btn {
            display: block;
            text-align: left;

            :first-child {
              margin-right: .5rem;
            }
          }
        }
      }

      .view-pages {
        padding-left: 1rem;
      }
    }
  }
}
</style>
