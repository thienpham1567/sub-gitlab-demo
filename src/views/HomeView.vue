<template>
  <header>
    <div class="header__content">
      <img src="../assets/img/cupcake.png" class="bat__img" alt="">
      <div class="menu__btn">
        <i class="fa-solid fa-bars"></i>
        <h5>Menu</h5>
      </div>
    </div>
  </header>
  <main>
    <div class="main__container">
      <aside class="nav-sidebar">
        <ul class="list-sidebar">
          <li>
            <h5><span>T</span></h5>
            <h4>thienpro</h4>
          </li>
          <li>
            <i class="fa-solid fa-folder-open"></i>
            <h5>Issues</h5>
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
.header__content {
  background-color: rgb(49, 2, 87);
  display: flex;
  align-items: center;
  padding: .3rem .6rem;

  .bat__img {
    width: 3.8rem;
    height: 3.8rem;
  }

  .menu__btn {
    font-size: large;
    color: white;
    display: flex;
    gap: .4rem;
    margin-left: 1rem;
  }
}

.main__container {
  width: 100%;

  .nav-sidebar {
    background-color: rgb(241, 241, 241);
    width: 17rem;
    height: 100vh;

    .list-sidebar {
      display: flex;
      flex-direction: column;
      gap: .5rem;
      list-style: none;
      padding: 1rem;

      li {
        display: flex;
        justify-content: left;
        align-items: center;
        padding: .8rem;
        gap: .6rem;
        border-radius: 5px;

        h4 {
          font-weight: bold;
        }

        span {
          background-color: rgb(255, 219, 225);
          padding: .5rem .8rem;
          border-radius: 5px;
        }

        &:hover {
          background-color: rgb(218, 218, 218);
          cursor: pointer;
        }
      }
    }

  }
}
</style>