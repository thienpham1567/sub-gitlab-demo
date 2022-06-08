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
      <aside class="nav-sidebar">
        <ul class="list-sidebar">
          <li>
            <RouterLink :to="{ name: 'home' }" class="item-sidebar">
              <div class="icon-and-title">
                <h5><span class="shortcut">T</span></h5>
                <h4>thienpro</h4>
              </div>
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'home' }" class="item-sidebar">
              <div class="icon-and-title">
                <i class="fa-solid fa-folder-open"></i>
                <h5>Issues</h5>
              </div>
              <span>5</span>
            </RouterLink>
            <ul class="content-in-item">
              <li>
                <RouterLink :to="{ name: 'home' }">List</RouterLink>
              </li>
              <li>
                <RouterLink :to="{ name: 'home' }">Broad</RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </div>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style lang="scss">
.header-content {
  background-color: rgb(49, 2, 87);
  display: flex;
  align-items: center;
  padding: .3rem .6rem;

  .bat-img {
    width: 3.8rem;
    height: 3.8rem;
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
  width: 100%;


  .nav-sidebar {
    background-color: rgb(243, 243, 243);
    width: 17rem;
    position: fixed;
    height: 100%;

    .list-sidebar {
      display: flex;
      flex-direction: column;
      gap: .5rem;
      list-style: none;
      padding: 1rem;

      li {
        .shortcut {
          background-color: rgb(255, 227, 231);
          padding: .4rem .8rem;
          border-radius: 5px;
        }
      }
    }

  }
}
</style>