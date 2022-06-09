<template>
  <div class="header-content">
    <img src="../assets/img/cupcake.png" class="bat-img" alt="">
    <div class="menu-btn">
      <i class="fa-solid fa-bars"></i>
      <h5>Menu</h5>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
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
    cursor: pointer;
  }

  .menu-btn {
    font-size: large;
    color: white;
    display: flex;
    gap: .4rem;
    margin-left: 1rem;
    cursor: pointer;
  }
}
</style>