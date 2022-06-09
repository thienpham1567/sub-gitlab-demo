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
  color: rgb(95, 95, 95);

  li {
    display: inline;

    a {
      text-decoration: none;
      color: rgb(95, 95, 95);

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

  .top-area {
    border-top: 1px solid rgb(199, 199, 199);
    border-bottom: 1px solid rgb(199, 199, 199);

    .issuable-list-states {
      display: flex;

      .item-state {
        list-style: none;
        padding: 1rem .7rem;
        cursor: pointer;

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

    .nav-controls {}
  }
}
</style>