<template>
  <header>
    <div class="header-content">
      <img src="../assets/img/cupcake.png" class="bat-img" alt="">
      <div class="menu-btn">
        <i class="fa-solid fa-bars"></i>
        <h5>Menu</h5>
      </div>
    </div>
  </header>
  <main>
    <div class="main-container">
      <aside :class="{ collapsed: isCollapsed }" class="nav-sidebar">
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
        <div class="collapse-btn" @click="collapseSidebar">
          <span v-if="isCollapsed" class="icon"> <i class="fa-solid fa-angles-right"></i></span>
          <span v-else class="icon"> <i class="fa-solid fa-angles-left"></i></span>
          <div class="icon-and-title">
            <span>Collapse sidebar</span>
          </div>
        </div>
      </aside>
      <div class="content-container">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';
import ListIssuesView from './ListIssuesView.vue';

const isClickedItem = ref(false);
const isCollapsed = ref(false);

const makeClickItem = () => isClickedItem.value = true;
const collapseSidebar = () => isCollapsed.value = !isCollapsed.value;




</script>

<style lang="scss">
.header-content {
  background-color: rgb(65, 0, 117);
  display: flex;
  align-items: center;
  padding: .2rem .4rem;
  //position: fixed;
  width: 100%;

  .bat-img {
    width: 3.5rem;
    height: 3.5rem;
  }

  .menu-btn {
    font-size: large;
    color: white;
    display: flex;
    gap: .4rem;
    margin-left: 1rem;
  }
}

.main-container {
  display: flex;
  width: 100%;

  .nav-sidebar {
    background-color: rgb(243, 243, 243);
    width: 20%;
    transition: all 0.5s ease-out;

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

  .content-container {
    background-color: rgb(220, 255, 255);
    width: 100%;
    display: block;
    padding: .5rem 10rem;
  }
}
</style>