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
        <RouterLink :to="{ name: 'home' }" class="btn border-light-grey">
          <i class="fa-solid fa-wifi"></i>
        </RouterLink>
        <RouterLink :to="{ name: 'home' }" class="btn border-light-grey">
          <i class="fa-solid fa-calendar-week"></i>
        </RouterLink>
        <div class="import-export">
          <RouterLink :to="{ name: 'home' }" class="btn border-light-grey">
            <i class="fa-solid fa-file-import"></i>
          </RouterLink>
          <RouterLink :to="{ name: 'home' }" class="btn-group border-light-grey square-right">
            <i class="fa-solid fa-file-export"></i>
            <i class="fa-solid fa-chevron-down"></i>
          </RouterLink>
        </div>
        <button class="btn issue-btn border-light-grey">Edit issues</button>
        <RouterLink :to="{ name: 'create-issues' }" class="btn issue-btn new-btn">New issus</RouterLink>
      </div>
    </div>
    <div class="filtered-search-input-container">
      <div class="issuable-search-container">
        <div class="btn-group square-right border-grey search-history">
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
        <div class="btn-group square-right border-grey">
          <span>Title</span>
          <i class="fa-solid fa-chevron-down"></i>
          <div class="dropdown-content">
            <span>Priority</span>
            <span>Created date</span>
            <span>Updated date</span>
            <span>Title</span>
          </div>
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
const filterOrder = ['Priority', 'Created date', 'Updated date', 'Title'];

const toggleMenu = () => {
  store.dispatch('toggle_menu');
}
</script>

<style lang="scss">
.issuable-list-container {
  display: block;
  color: rgb(85, 85, 85);

  .top-area {
    display: flex;
    border-top: 1px solid rgb(216, 216, 216);
    border-bottom: 1px solid rgb(216, 216, 216);

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
          border: 1px solid rgb(216, 216, 216);
          border-left: none;

          i {
            border: none;
          }
        }
      }
    }
  }

  .filtered-search-input-container {
    width: 100%;
    display: flex;
    background-color: rgb(240, 240, 240);
    border-bottom: 1px solid rgb(216, 216, 216);
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
    }

    .sort-dropdown-container {
      display: flex;
      position: relative;
      z-index: 1;

      .btn-group {
        &:hover {
          .dropdown-content {
            display: flex;
          }
        }
      }

      .dropdown-content {
        display: none;
        flex-direction: column;
        position: absolute;
        background-color: white;
        padding: 1rem;
        border: 1px solid rgb(177, 177, 177);
        border-radius: 5px;
        box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
        top: 2.6rem;
        left: -5.3rem;

        span {
          display: block;
          width: 7.5rem;
          margin-bottom: .5rem;
          padding: .3rem .2rem;
          border-radius: 5px;

          &:hover {
            background-color: rgb(214, 214, 214);
          }
        }
      }
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
      border-bottom: 1px solid rgb(216, 216, 216);


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

@media screen and (max-width:767px) {

  .bread-crumb {
    .bars-menu {
      display: inline-block;
    }
  }

  .nav-controls {
    flex-direction: column;
    margin-top: .5rem;

    .btn {
      width: 100%;
      display: block;
      align-items: center;
      justify-content: center;
    }

    .import-export {
      width: 100%;

      .btn-group {
        width: 100%;
        height: 97%;
      }
    }
  }

  .filtered-search-input-container {
    flex-direction: column;

    .sort-dropdown-container {
      width: 100%;

      .btn-group {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }

    }

  }


}
</style>