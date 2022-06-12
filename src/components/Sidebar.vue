<template>
  <div class="sidebar-icon">
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
      </li>
    </ul>
    <div class="collapse-btn" @click="makeCollapsed">
      <span v-if="isCollapsed"> <i class="fa-solid fa-angles-right"></i></span>
      <span v-else> <i class="fa-solid fa-angles-left"></i></span>
      <div class="content">
        <span>Collapse sidebar</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  isCollapsed: Boolean
});
const store = useStore();
const emit = defineEmits(['collapsedSidebar']);
const isClickedItem = ref(false);

const makeClickItem = () => isClickedItem.value = true;
const makeCollapsed = () => {
  console.log(innerWidth);
  emit('collapsedSidebar');
}

</script>

<style lang="scss" scoped>
.sidebar-icon {
  width: 100%;
  background-color: rgb(245, 245, 245);
  height: 36.55rem;
  display: flex;
  padding: 0 .5rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .list-sidebar {
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
}


@media only screen and (max-width:768px) {}
</style>