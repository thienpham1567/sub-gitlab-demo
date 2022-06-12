<template>
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
          <RouterLink :to="{ name: 'home' }" class="btn-group export-btn">
            <i class="fa-solid fa-file-export"></i>
            <i class="fa-solid fa-chevron-down"></i>
          </RouterLink>
        </div>
        <button class="btn issue-btn ">Edit issues</button>
        <RouterLink :to="{ name: home }" class="btn issue-btn new-btn">New issus</RouterLink>
      </div>
    </div>
    <div class="filtered-search-input-container">
      <div class="issuable-search-container">
        <div class="btn-group search-history">
          <i class="fa-solid fa-clock-rotate-left"></i>
          <i class="fa-solid fa-chevron-down"></i>
        </div>
        <div class="filtered-search-input">
          <input type="text" name="" placeholder="Search or filter results">
        </div>
        <div class="btn btn-helper">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div class="sort-dropdown-container">
        <div class="btn-group">
          <span>Title</span>
          <i class="fa-solid fa-chevron-down"></i>
        </div>
        <div class="btn btn-helper">
          <i v-if="isAscOrder" class="fa-solid fa-arrow-up-short-wide"></i>
          <i v-else class="fa-solid fa-arrow-down-wide-short"></i>
        </div>
      </div>
    </div>
    <ul class="issues-list">
      <li v-for="(issue, index) in store.getters.issuesList" :key="index" class="issue">
        <div class="issuable-main-info">
          <div class="issue-title">
            <RouterLink :to="{ name: 'home' }">{{ issue.title }}</RouterLink>
          </div>
          <div class="issuable-info">
            <span>#{{ index + 1 }}</span>
            <span>.</span>
            <span>created 5 days ago by Thien Pham Ngoc</span>
          </div>
        </div>
        <div class="issuable-meta">
          <div class="comments">
            <i class="fa-solid fa-comments"></i>
            <span>0</span>
          </div>
          <div class="update-history">
            <span>updated just now</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="link">
      <button class="btn btn-link">Email a new issue to this project</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';

const store = useStore();
const route = useRoute();
const isAscOrder = ref(true);


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
    border-top: 1px solid rgb(199, 199, 199);
    border-bottom: 1px solid rgb(199, 199, 199);

    .issuable-list-states {
      width: 100%;
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
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
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
          border: 1px solid rgb(199, 199, 199);
          border-left: none;

          i {
            border: none;
          }
        }
      }
    }
  }

  .filtered-search-input-container {
    display: flex;
    background-color: rgb(240, 240, 240);
    border-bottom: 1px solid rgb(199, 199, 199);
    gap: 1rem;
    padding: 1.1rem;

    .issuable-search-container {
      display: flex;
      background-color: white;
      width: 100%;

      .search-history {
        width: 8%;

        &:hover {
          background-color: rgb(226, 226, 226);
        }

        :nth-child(1) {
          font-size: 1.1rem;
        }

        :nth-child(2) {
          font-size: .7rem;
        }
      }

      .filtered-search-input {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 95%;
        border: 1px solid grey;
        padding: .5rem;
        border-left: none;

        input {
          width: 100%;
          border: none;
          outline: none;
        }
      }
    }

    .sort-dropdown-container {
      display: flex;
    }
  }

  .issues-list {
    background-color: rgb(250, 250, 250);
    width: 100%;
    list-style: none;

    .issue {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: .8rem 1rem;
      border-bottom: 1px solid rgb(199, 199, 199);


      .issuable-main-info {

        .issuable-title,
        a {
          display: block;
          text-decoration: none;
          color: black;
          margin-bottom: .2rem;

          &:hover {
            text-decoration: underline;
            color: rgb(0, 68, 255);
          }

        }

        .issuable-info {
          span {
            margin-right: .3rem;
          }
        }
      }

      .issuable-meta {
        .comments {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: .3rem;
        }
      }

    }
  }

  .link {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;

    .btn-link {
      border: none;
      width: 15rem;
      color: rgb(0, 68, 255);

      &:hover {
        text-decoration: underline;
        background-color: white;
      }
    }
  }

}

@media screen and (max-width:990px) {
  .top-area {
    flex-direction: column-reverse;

    .nav-controls {
      justify-content: flex-start !important;
      margin-top: .5rem;
    }
  }
}

@media screen and (max-width:768px) {

  .nav-controls {
    flex-direction: column;
    margin-top: .5rem;

    .btn {
      width: 100%;
      display: block;
      align-items: center;
      justify-content: center;
    }
  }

}
</style>