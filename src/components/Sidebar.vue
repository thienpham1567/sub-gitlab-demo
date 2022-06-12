<template>
  <div class="sidebar-container">
    <ul class=" list-sidebar">
      <li>
        <RouterLink :to="{ name: 'home' }" class="item-sidebar wider">
          <span class="icon shortcut">T</span>
          <div class="content">
            <span class="title bold">thienpro</span>
          </div>
        </RouterLink>
      </li>
      <li @click="makeClickItem">
        <RouterLink :to="{ name: 'issues' }" class="item-sidebar">
          <span class="icon"><i class="fa-solid fa-folder-open"></i></span>
          <div class="content">
            <span class="title">Issues</span>
            <span class="counter">{{ store.getters.lengthIssuesList }}</span>
          </div>
        </RouterLink>
        <ul v-if="isClickedItem" class="content-in-item">
          <li>
            <RouterLink :to="{ name: 'issues' }">List</RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'home' }">Broad</RouterLink>
          </li>
        </ul>
      </li>
    </ul>
    <div v-if="!toggleSidebar" class="collapse-btn" @click="makeCollapsed">
      <span v-if="isCollapsed"> <i class="fa-solid fa-angles-right"></i></span>
      <span v-else> <i class="fa-solid fa-angles-left"></i></span>
      <div class="content">
        <span v-if="!toggleSidebar">Collapse sidebar</span>
      </div>
    </div>
    <div v-else class="collapse-btn" @click="closeMenu">
      <span v-if="toggleSidebar"><i class="fa-solid fa-xmark"></i></span>
      <div class="content">
        <span v-if="toggleSidebar">close sidebar</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  isCollapsed: Boolean,
  toggleSidebar: Boolean
});
const store = useStore();
const emit = defineEmits(['collapsedSidebar']);
const isClickedItem = ref(false);

const makeClickItem = () => isClickedItem.value = true;
const makeCollapsed = () => {
  emit('collapsedSidebar');
}
const closeMenu = () => {

}

</script>

<style lang="scss">
.sidebar-container {
  width: 100%;
  background-color: rgb(245, 245, 245);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 .5rem;
  z-index: 50;

  .list-sidebar {
    width: 100%;
    height: 94%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
    list-style: none;
    padding-top: .5rem;

    a {
      color: rgb(85, 85, 85);
      text-decoration: none;
    }

    .item-sidebar {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0 .2rem;

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
      }

      .shortcut {
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
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 6%;
    align-items: center;
    gap: 1rem;
    padding: .7rem 1rem;

    &:hover {
      background-color: rgb(228, 228, 228);
    }
  }
}


@media only screen and (max-width:768px) {}
</style>