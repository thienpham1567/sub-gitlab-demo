<template>
  <div class="nav-sidebar">
    <ul class="list-sidebar">
      <li>
        <RouterLink :to="{ name: 'home' }" class="item-sidebar">
          <span class="shortcut icon">T</span>
          <div class="icon-and-title">
            <h4>thienpro</h4>
          </div>
        </RouterLink>
      </li>
      <li @click="makeClickItem">
        <RouterLink :to="{ name: 'issues' }" class="item-sidebar">
          <span class="icon"><i class="fa-solid fa-folder-open"></i></span>
          <div class="icon-and-title">
            <h5 :class="{ 'active-item': isClickedItem }">Issues</h5>
            <span class="issues-counter">5</span>
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
    <div class="collapse-btn" @click="makeCollapsed">
      <span v-if="isCollapsed" class="icon"> <i class="fa-solid fa-angles-right"></i></span>
      <span v-else class="icon"> <i class="fa-solid fa-angles-left"></i></span>
      <div class="icon-and-title">
        <span>Collapse sidebar</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';

const props = defineProps({
  isCollapsed: Boolean
});
const emit = defineEmits(['collapseSidebar'])
const isClickedItem = ref(false);

const makeClickItem = () => isClickedItem.value = true;
const makeCollapsed = () => {
  emit('collapseSidebar', {});
}

</script>

<style lang="scss" scoped>
.nav-sidebar {
  background-color: rgb(243, 243, 243);

  .list-sidebar {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    list-style: none;
    padding: 1rem;

    .shortcut {
      background-color: rgb(255, 227, 231);
      border-radius: 3px;
      font-size: large;
    }

  }

  .collapse-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 26.8rem;
    border-top: 1px solid rgb(228, 228, 228);
    padding: .5rem 1rem;
    font-size: .9rem;
    cursor: pointer;


    &:hover {
      background-color: rgb(228, 228, 228);
      border-radius: 3px;
    }
  }

}
</style>