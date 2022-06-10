<template>
  <div class="Breadcrumbs-container">
    <ul class="bread-crumb">
      <li>Pham Ngoc Thien</li>
      <li>thienpro</li>
      <li>
        <RouterLink :to="{ name: 'issues' }">
          {{ route.name }}
        </RouterLink>
      </li>
    </ul>
    <div class="issuable-list-container">
      <div class="top-area">
        <ul class="issuable-list-states">
          <li class="item-state">
            <span>Open</span>
            <span>5</span>
          </li>
          <li class="item-state">
            <span>Closed</span>
            <span>5</span>
          </li>
          <li class="item-state">
            <span>All</span>
            <span>5</span>
          </li>
        </ul>
        <div class="nav-controls">
          <RouterLink :to="{ name: 'home' }" class="btn">
            <i class="fa-solid fa-wifi"></i>
          </RouterLink>
          <RouterLink :to="{ name: 'home' }" class="btn">
            <i class="fa-solid fa-calendar-week"></i>
          </RouterLink>
          <div class="import-export">
            <RouterLink :to="{ name: 'home' }" class="btn">
              <i class="fa-solid fa-file-import"></i>
            </RouterLink>
            <RouterLink :to="{ name: 'home' }" class="btn">
              <i class="fa-solid fa-file-export"></i>
            </RouterLink>
          </div>
          <button class="btn issue-btn ">Edit issues</button>
          <RouterLink :to="{ name: home }" class="issue-btn new-btn">New issus</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';
const route = useRoute();


</script>

<style lang="scss" scoped>
.bread-crumb {
  list-style: none;
  padding: .5rem 0 1rem 0;
  color: rgb(85, 85, 85);

  li {
    display: inline;

    a {
      text-decoration: none;
      color: rgb(85, 85, 85);

      &:hover {
        color: black;
        text-decoration: underline;
      }
    }
  }

  li+li::before {
    padding: .5rem;
    content: "/\00a0";
  }
}

.issuable-list-container {
  display: block;
  color: rgb(85, 85, 85);

  .top-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgb(199, 199, 199);
    border-bottom: 1px solid rgb(199, 199, 199);

    .issuable-list-states {
      display: flex;

      .item-state {
        list-style: none;
        padding: 1rem .7rem;
        cursor: pointer;
        border: 2px solid white;

        &:hover {
          border-bottom: 2px solid rgb(199, 199, 199);
        }

        :first-child {
          margin-right: .5rem;
        }

        :nth-child(2) {
          padding: 0 .4rem;
          border-radius: 10px;
          background-color: rgb(218, 218, 218);
        }
      }
    }

    .nav-controls {
      display: flex;
      gap: .5rem;

      a {
        color: rgb(85, 85, 85);
        text-decoration: none;
      }

      .import-export {
        display: flex;

        :nth-child(1) {
          border-radius: 5px 0px 0px 5px;
        }

        :nth-child(2) {
          border-radius: 0px 5px 5px 0px;
          border-left: none;
        }
      }
    }
  }
}
</style>