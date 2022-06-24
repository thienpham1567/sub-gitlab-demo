<template>
  <div class="header-content">
    <RouterLink :to="{ name: 'issues' }" class="logo">
      <img src="../assets/img/gitlab-logo-500.png" alt="">
    </RouterLink>
    <div class="menu-btn">
      <i class="fa-solid fa-bars"></i>
      <h5>Menu</h5>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped>
.header-content {
  position: fixed;
  width: 100%;
  background-color: rgb(45, 0, 117);
  display: flex;
  align-items: center;
  padding: .2rem .4rem;
  width: 100%;
  color: white;
  z-index: 5;

  .logo {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 10px;

    img {
      width: 3.5rem;
      height: 3.5rem;
    }

    &:hover {
      background-color: rgba(240, 240, 240, 0.3)
    }
  }

  .menu-btn {
    display: flex;
    gap: .4rem;
    margin-left: 1rem;
    cursor: pointer;
  }
}

@media screen and (max-width:767px) {
  .header-content {
    justify-content: space-between;

    .menu-btn {
      padding-right: 1rem;
    }
  }
}
</style>