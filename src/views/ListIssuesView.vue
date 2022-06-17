<template>
  <div class="main-page">
    <div class="issuable-container">
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
            <li @click="toggleIssueStateOpen" class="item-state">
              <span>Open</span>
              <span>{{ openIssues.length }}</span>
            </li>
            <li @click="toggleIssueStateClosed" class="item-state">
              <span>Closed</span>
              <span>{{ closedIssues.length }}</span>
            </li>
            <li @click="toggleIssueStateAll" class="item-state">
              <span>All</span>
              <span>{{ issuesList.length }}</span>
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
            <button :disabled="issuesStatePresent.issues.length === 0" class="btn issue-btn border-light-grey">Edit
              issues</button>
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
              <ul class="dropdown-content">
                <li>Priority</li>
                <li>Created date</li>
                <li>Updated date</li>
                <li>Title</li>
              </ul>
            </div>
            <div class="btn btn-helper">
              <i v-if="isAscOrder" class="fa-solid fa-arrow-up-short-wide"></i>
              <i v-else class="fa-solid fa-arrow-down-wide-short"></i>
            </div>
          </div>
        </div>
        <ul v-if="issuesStatePresent.issues.length > 0" class="issues-list">
          <li v-for="(issue, index) in issuesStatePresent.issues" :key="index" class="issue">
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
        <div v-else-if="issuesStatePresent.presentState === 'open'" class="none-of-issues">
          <embed class="img"
            src="https://gitlab.com/assets/illustrations/issues-b4cb30d5143b86be2f594c7a384296dfba0b25199db87382c3746b79dafd6161.svg"
            type="">
          <h1>There are no open issues</h1>
          <p>To keep this project going, create a new issue</p>
          <RouterLink :to="{ name: 'create-issues' }" class="issue-btn new-btn">New issus</RouterLink>
        </div>
        <div v-else class="none-of-issues">
          <embed class="img"
            src="https://gitlab.com/assets/illustrations/issues-b4cb30d5143b86be2f594c7a384296dfba0b25199db87382c3746b79dafd6161.svg"
            type="">
          <h1>There are no closed issues</h1>
        </div>
        <div></div>
        <div class="link">
          <button class="btn btn-link">Email a new issue to this project</button>
        </div>
      </div>
    </div>
    <div class="issuable-update-sidebar">
      <div class="btns">
        <button class="btn issue-btn border-light-grey">Update all</button>
        <button class="btn issue-btn border-light-grey">Cancel</button>
      </div>
      <div class="status">
        <label for="">Status</label>
        <button class="btn-group border-light-grey select-status">
          <span>Select status</span>
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <ul class="dropdown-content list-status">
          <li>Open</li>
          <li>Closed</li>
        </ul>
      </div>
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

const issuesList = store.getters.issuesList;
const openIssues = store.getters.openIssues;
const closedIssues = store.getters.closedIssues;
let issuesStatePresent = ref({
  presentState: "open",
  issues: openIssues
});

const toggleMenu = () => {
  store.dispatch('toggle_menu');
}

const toggleIssueStateOpen = () => {
  issuesStatePresent.value = {
    presentState: "open",
    issues: openIssues
  };

}
const toggleIssueStateClosed = () => {
  issuesStatePresent.value = {
    presentState: "closed",
    issues: closedIssues
  };

}
const toggleIssueStateAll = () => {
  issuesStatePresent.value = {
    presentState: "all",
    issues: issuesList
  };

}
</script>

<style lang="scss">
.main-page {
  position: relative;
  width: 100%;
  display: flex;

  .issuable-container {
    width: 100%;

    .issuable-list-container {
      width: 100%;
      display: block;
      color: rgb(85, 85, 85);

      .top-area {
        display: flex;
        border-top: 1px solid rgb(225, 225, 225);
        border-bottom: 1px solid rgb(225, 225, 225);

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
              margin-right: .4rem;
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
        background-color: rgb(247, 247, 247);
        border-bottom: 1px solid rgb(225, 225, 225);
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

      .none-of-issues {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem 0;
        gap: 1rem;

        .img {
          width: 17rem;
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
  }

  .issuable-update-sidebar {
    width: 30%;
    height: 39.5rem;
    padding: .5rem 1rem;
    margin-left: 1rem;
    border-left: 1px solid rgb(225, 225, 225);
    transition: all 0.3s ease-in-out;
    padding-right: 0;

    .btns {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    .status {
      width: 100%;
      position: relative;

      .select-status {
        justify-content: space-between;
        width: 100%;
      }

      .list-status {
        width: 100%;
        left: 0rem;
        top: 3.7rem;

        li {
          width: 100%;
        }
      }

      &:hover {
        .dropdown-content {
          display: flex;
        }
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

  .issuable-list-container {
    .top-area {
      .nav-controls {
        flex-direction: column;
        margin-top: .5rem;

        .btn {
          width: 100%;
          display: block;
          text-align: center;
        }

        .import-export {
          width: 100%;

          .btn-group {
            width: 100%;
            height: 97%;
          }
        }
      }
    }

    .filtered-search-input-container {
      flex-direction: column;

      .issuable-search-container {
        .search-history {
          width: 15%;
        }
      }

      .sort-dropdown-container {
        width: 100%;

        .dropdown-content {
          top: -11.1rem;
          left: 14rem;
        }

        .btn-group {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
      }
    }
  }
}
</style>