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
  width: 100%;
  background-color: rgb(45, 0, 117);
  display: flex;
  align-items: center;
  padding: .2rem .4rem;
  width: 100%;
  color: white;

  .logo {
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
    font-size: large;
    display: flex;
    gap: .4rem;
    margin-left: 1rem;
    cursor: pointer;
  }
}
</style>