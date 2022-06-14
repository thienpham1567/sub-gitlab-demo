<template>
  <ul class="bread-crumb">
    <button @click.prevent="toggleMenu" class="bars-menu"><i class="fa-solid fa-bars"></i></button>
    <li>Pham Ngoc Thien</li>
    <li>thienpro</li>
    <li>
      <RouterLink :to="{ name: 'issues' }">
        {{ route.name }}
      </RouterLink>
    </li>
  </ul>
  <div class="issues-filters">
    <div class="issues-details-filters">
      <div class="half-left-content">
        <button class="btn-group border-light-grey development-btn">
          <span>Development</span>
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <button class="btn border-light-grey new-board-btn">
          New board
        </button>
        <div class="search">
          <div class="filtered-search-input square-right">
            <input type="text" name="search" placeholder="Search">
          </div>
          <div class="btn btn-helper">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </div>
      <div class="half-right-content">
        <div class="board-labels">
          <span>Show labels</span>
        </div>
        <button class="btn issue-btn border-light-grey">Edit board</button>
        <button class="issue-btn new-btn border-light-grey">Create list</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
const route = useRoute();
const store = useStore();

const toggleMenu = () => {
  store.dispatch('toggle_menu');
}

</script>

<style lang="scss" scoped>
.issues-filters {
  background-color: rgb(240, 240, 240);
  width: 100%;
  border-top: 1px solid rgb(216, 216, 216);
  border-bottom: 1px solid rgb(216, 216, 216);
  padding: 1rem;

  .issues-details-filters {
    display: flex;
    width: 100%;
    gap: .5rem;

    .half-left-content {
      display: flex;
      align-items: center;
      width: 70%;
      gap: .5rem;

      .development-btn {
        justify-content: space-between;
        width: 24%;
      }

      .new-board-btn {
        width: 18%;
      }

      .search {
        display: flex;
        width: 58%;

        .filtered-search-input {
          border-left: 1px solid grey;
        }
      }
    }

    .half-right-content {
      display: flex;
      align-items: center;
      width: 30%;
      gap: .5rem;
    }

  }
}

@media screen and (max-width:992px) {
  .issues-filters {
    .issues-details-filters {
      flex-direction: column;

      .half-left-content {
        width: 100%;
      }

      .half-right-content {
        width: 100%;
      }

    }
  }
}

@media screen and (max-width:767px) {}
</style>