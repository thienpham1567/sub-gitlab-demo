<template>
  <div class="sidebar-container" :class="{ collapsed: isCollapsed, uncollapsed: !isCollapsed }">
    <ul class="list-sidebar">
      <li>
        <RouterLink :to="{ name: 'home' }" class="item-sidebar wider">
          <span class="icon shortcut">T</span>
          <div class="content">
            <span class="title bold">thienpro</span>
          </div>
        </RouterLink>
      </li>
      <li @click="makeClickItem" class="tooltip-issues">
        <RouterLink :to="{ name: 'issues' }" class="item-sidebar">
          <span class="icon"><i class="fa-solid fa-folder"></i></span>
          <div class="content">
            <span class="title">Issues</span>
            <span class="counter">{{ lengthIssuesList }}</span>
          </div>
        </RouterLink>
        <ul v-if="isClickedItem" class="content-in-item">
          <li>
            <RouterLink :to="{ name: 'issues' }">List</RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'issue-boards' }">Boards</RouterLink>
          </li>
        </ul>
        <div class="content-tooltip">
          <div class="content-title">
            <span class="title">Issues</span>
            <span class="counter">{{ lengthIssuesList }}</span>
          </div>
          <ul class="content-in-item">
            <li>
              <RouterLink :to="{ name: 'issues' }">List</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'issue-boards' }">Boards</RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <div v-if="!store.getters.toggleSidebar" class="collapse-btn" @click.prevent="makeCollapsed">
      <span v-if="isCollapsed"> <i class="fa-solid fa-angles-right"></i></span>
      <span v-else> <i class="fa-solid fa-angles-left"></i></span>
      <div class="content">
        <span>Collapse sidebar</span>
      </div>
    </div>
    <div v-else class="collapse-btn" @click.prevent="closeMenu">
      <span><i class="fa-solid fa-xmark"></i></span>
      <span>close sidebar</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';

const emit = defineEmits(['collapsedSidebar', 'changeIconCollapsed']);
const props = defineProps({
  isCollapsed: Boolean,
});
const store = useStore();
const isClickedItem = ref(false);

onMounted(() => {
  window.addEventListener("resize", getCurrentWidthPage)
});

const makeClickItem = () => isClickedItem.value = true;
const makeCollapsed = () => {
  emit('collapsedSidebar');
}
const lengthIssuesList = computed(() => store.getters.issuesList.length);
const closeMenu = () => {
  store.dispatch('toggle_menu');
}

const widthPage = ref();

const getCurrentWidthPage = () => {
  widthPage.value = window.innerWidth;
  if (widthPage.value <= 1200) {
    emit('changeIconCollapsed')
  }
}




</script>

<style lang="scss">
.sidebar-container {
  position: fixed;
  width: 18%;
  height: 100vh;
  background-color: rgb(240, 240, 240);
  padding: 0 .4rem;
  z-index: 50;
  transition: all 0.3s ease-in-out;

  .list-sidebar {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
    list-style: none;
    padding-top: .5rem;

    .content-tooltip {
      display: none;
    }

    a {
      color: rgb(85, 85, 85);
      text-decoration: none;
    }

    .item-sidebar {
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.2rem;
        height: 2.2rem;
      }

      .shortcut {
        width: 2.2rem;
        height: 2.2rem;
        background-color: rgb(255, 223, 229);
        border-radius: 5px;
        border: 1px solid rgb(218, 218, 218);
      }

      &:hover {
        background-color: rgb(224, 224, 224);
        border-radius: 5px;
      }
    }

  }

  .collapse-btn {
    position: absolute;
    display: flex;
    width: 100%;
    align-items: center;
    gap: 1rem;
    padding: .7rem 1rem;
    bottom: 3.6rem;
    left: 0;
    cursor: pointer;

    &:hover {
      background-color: rgb(228, 228, 228);
    }
  }
}

@media screen and (max-width:1200px) {

  // Uncollapsed, when width page is in 1200px
  main {
    .main-container {
      .sidebar {
        .uncollapsed {
          position: fixed;
          width: 23%;
          transition: all 0.3s ease-in-out;

          .list-sidebar {
            align-items: flex-start;

            li {
              .item-sidebar {
                .content {
                  display: block;
                }
              }
            }

            .tooltip-issues {
              .content-tooltip {
                display: none;
              }

              .content-in-item {
                visibility: visible;
              }
            }
          }

          .collapse-btn {
            .content {
              display: block;
            }
          }
        }
      }
    }
  }

  .sidebar-container {

    .list-sidebar {
      .tooltip-issues {
        position: relative;
        width: 100%;
        z-index: 10;

        .content-tooltip {
          position: absolute;
          visibility: hidden;
          display: block;
          align-items: center;
          justify-content: center;
          top: -.4rem;
          left: 3.2rem;
          width: 12rem;
          background-color: white;
          border-radius: 5px;
          padding: 2.5rem .5rem .5rem .5rem;
          margin-top: .11rem;
          box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);

          .content-title {
            position: absolute;
            background-color: rgb(202, 202, 202);
            border-radius: 5px 5px 0px 0px;
            left: 0;
            top: 0;
            width: 12rem;
            height: 2rem;
            text-align: center;
            padding-top: .2rem;
          }
        }

        &:hover {
          .content-tooltip {
            visibility: visible;

            .content-in-item {
              visibility: visible;
              display: block;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width:990px) {

  // Uncollapsed, when width page is in 990px
  main {
    .main-container {
      .sidebar {
        .uncollapsed {
          width: 30%;
          transition: all 0.3s ease-in-out;

          .list-sidebar {}
        }
      }
    }
  }
}



@media screen and (max-width:767px) {
  .sidebar-container {
    .list-sidebar {
      .tooltip-issues {
        .content-tooltip {
          display: none;
        }
      }
    }
  }
}
</style>