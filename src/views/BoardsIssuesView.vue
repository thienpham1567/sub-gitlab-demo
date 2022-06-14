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
  <div class="board-list">
    <div class="board">
      <div class="inner-board">
        <div class="top-area-board">
          <div class="state">
            <i class="fa-solid fa-chevron-down"></i>
            <span>Open</span>
          </div>
          <div class="new-issue-board">
            <i class="fa-solid fa-folder"></i>
            <span>{{ openIssues.length }}</span>
            <button class="btn border-light-grey"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
        <ul class="issues-container">
          <li v-for="(issue, index) in store.getters.openIssues" :key="index">
            <span>{{ issue.title }}</span>
            <span>#{{ index }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="board closed">
      <div class="inner-board">
        <div class="top-area-board">
          <div class="state">
            <i class="fa-solid fa-chevron-down"></i>
            <span>Closed</span>
          </div>
          <div class="new-issue-board">
            <i class="fa-solid fa-folder"></i>
            <span>{{ closedIssues.length }}</span>
          </div>
        </div>
        <ul class="issues-container">
          <li v-for="(issue, index) in store.getters.closedIssues" :key="index">
            <span>{{ issue.title }}</span>
            <span>#{{ index }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
const route = useRoute();
const store = useStore();

const openIssues = store.getters.openIssues;
const closedIssues = store.getters.closedIssues;

const toggleMenu = () => {
  store.dispatch('toggle_menu');
}



</script>

<style lang="scss" scoped>
.issues-filters {
  width: 100%;
  background-color: rgb(247, 247, 247);
  border-top: 1px solid rgb(225, 225, 225);
  border-bottom: 1px solid rgb(225, 225, 225);
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
        width: 23%;
      }

      .new-board-btn {
        width: 16%;
      }

      .search {
        display: flex;
        width: 61%;

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

.board-list {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
  gap: 1rem;

  .board {
    width: 35%;
    background-color: rgb(237, 237, 237);
    padding: 0 .5rem;
    border-radius: 5px;

    .inner-board {
      .top-area-board {
        height: 3.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .5rem 0;

        .state {
          text-align: center;

          span {
            font-weight: 500;
          }

          i {
            padding: .5rem;
            font-size: .7rem;
            border-radius: 5px;
            margin-right: .4rem;

            &:hover {
              background-color: rgb(199, 199, 199);
            }
          }
        }

        .new-issue-board {
          display: flex;
          align-items: center;
          font-size: 1rem;
          gap: .5rem;
          color: rgb(109, 109, 109);

          .btn {
            i {
              color: rgb(109, 109, 109);
              font-size: 1rem;
              text-align: center;
            }
          }
        }
      }
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

@media screen and (max-width:767px) {
  .bread-crumb {
    .bars-menu {
      display: inline-block;
    }
  }

  .issues-filters {
    background-color: white;

    .issues-details-filters {
      flex-direction: column;

      .half-left-content {
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
        gap: 0;

        .development-btn {
          justify-content: space-between;
          width: 100%;
          margin-bottom: 1rem;
        }

        .new-board-btn {
          width: 18%;
        }

        .search {
          display: flex;
          width: 100%;

          .filtered-search-input {
            border-left: 1px solid grey;
          }
        }
      }

      .half-right-content {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;

        button {
          display: block;
          width: 100%;
        }

      }

    }
  }

}
</style>