<template>
  <div class="main-page">
    <div class="issuable-list-container">
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
      <div class="top-area">
        <ul class="issuable-list-states">
          <li @click="toggleIssueStateOpen" ref="openState" class="item-state">
            <span>Open</span>
            <span>{{ openIssues.length }}</span>
          </li>
          <li @click="toggleIssueStateClosed" ref="closedState" class="item-state">
            <span>Closed</span>
            <span>{{ closedIssues.length }}</span>
          </li>
          <li @click="toggleIssueStateAll" ref="allState" class="item-state">
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
          <button @click="editIssues" :disabled="makeEditBtnDisable" class="btn issue-btn border-light-grey"
            :class="{ 'disable-btn': makeEditBtnDisable }">
            Edit issues
          </button>
          <RouterLink :to="{ name: 'create-issues' }" class="btn issue-btn new-btn">New issus</RouterLink>
        </div>
      </div>
      <div class="filtered-search-input-container">
        <input @change="makeAllChecked" v-show="isClickedEditIssues" type="checkbox" ref="checkAll">
        <div class="issuable-search-container">
          <div class="btn-group square-right border-grey search-history">
            <i class="fa-solid fa-clock-rotate-left"></i>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div class="filtered-search-input">
            <input type="text" v-model="searchInput" placeholder="Search or filter results...">
            <i @click="clearInput" v-show="searchInput.length > 0" class="fa-solid fa-circle-xmark clear-input"></i>
          </div>
          <div @click="toggleSearch" class="btn btn-helper">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div class="sort-dropdown-container">
          <div class="btn-group square-right border-grey">
            <span ref="sortBy"></span>
            <i class="fa-solid fa-chevron-down"></i>
            <ul class="dropdown-content">
              <li @click="orderByTitle">Title</li>
              <li @click="orderByCreateDate">Created date</li>
              <li @click="orderByUpdateDate">Updated date</li>
            </ul>
          </div>
          <div @click="changeOrderIssues" class="btn btn-helper">
            <i v-if="isAscOrder" class="fa-solid fa-arrow-up-short-wide"></i>
            <i v-else class="fa-solid fa-arrow-down-wide-short"></i>
          </div>
        </div>
      </div>
      <ul v-if="issuesStatePresent.issues.length > 0" class="issues-list">
        <li v-for="(issue, index) in issuesStatePresent.issues" :key="issue.id" class="issue">
          <div class="issuable-main-info">
            <input v-show="isClickedEditIssues" type="checkbox" :value="index" v-model="checkedItems">
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
              <span v-if="!issue.status">CLOSED</span>
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
      <div v-else-if="issuesStatePresent.presentState === 'searchResults'" class="none-of-issues">
        <embed class="img"
          src="https://gitlab.com/assets/illustrations/issues-b4cb30d5143b86be2f594c7a384296dfba0b25199db87382c3746b79dafd6161.svg"
          type="">
        <h1>Sorry, your filter produced no results</h1>
        <p>To widen your search, change or remove filters above</p>
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
    <div class="issuable-update-sidebar" :class="{ edit: isClickedEditIssues }">
      <div class="btns">
        <button :disabled="isCheckedItemsEmpty" @click="updateAllIssues" class="btn issue-btn border-light-grey"
          :class="{ 'disable-btn': isCheckedItemsEmpty }">Update all</button>
        <button @click="editIssues" class="btn issue-btn border-light-grey">Cancel</button>
      </div>
      <div class="status">
        <label for="">Status</label>
        <button class="btn-group border-light-grey select-status">
          <span ref="selectStatus">Select status</span>
          <span v-if="isSelectedOpen">Open</span>
          <span ref="closedStatus"></span>
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <div class="dropdown-content list-status">
          <li @click="updateOpenStatus">Open</li>
          <li @click="updateClosedStatus">Closed</li>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';

const store = useStore();
const route = useRoute();
const isClickedEditIssues = ref(false);

const toggleMenu = () => {
  store.dispatch('toggle_menu');
}

const issuesList = computed(() => store.getters.issuesList);
const openIssues = computed(() => store.getters.openIssues);
const closedIssues = computed(() => store.getters.closedIssues);
const openState = ref(null);
const closedState = ref(null);
const allState = ref(null);

let issuesStatePresent = ref({
  presentState: "open",
  issues: openIssues
});
const toggleIssueStateOpen = () => {
  openState.value.classList.add("item-state-clicked");
  closedState.value.classList.remove("item-state-clicked");
  allState.value.classList.remove("item-state-clicked");
  issuesStatePresent.value = {
    presentState: "open",
    issues: openIssues
  };
}
const toggleIssueStateClosed = () => {
  openState.value.classList.remove("item-state-clicked");
  closedState.value.classList.add("item-state-clicked");
  allState.value.classList.remove("item-state-clicked");
  issuesStatePresent.value = {
    presentState: "closed",
    issues: closedIssues
  };

}
const toggleIssueStateAll = () => {
  openState.value.classList.remove("item-state-clicked");
  closedState.value.classList.remove("item-state-clicked");
  allState.value.classList.add("item-state-clicked");
  issuesStatePresent.value = {
    presentState: "all",
    issues: issuesList
  };

}

// Handle edit btn
const checkedItems = ref([]);
const checkAll = ref(null);
const selectStatus = ref(null);
const closedStatus = ref(null);
const isSelectedOpen = ref(false);

const isCheckedItemsEmpty = computed(() => checkedItems.value.length === 0);
const makeEditBtnDisable = computed(() => issuesStatePresent.value.issues.length === 0 || isClickedEditIssues.value);

const editStatus = (status) => {
  issuesStatePresent.value.issues.forEach((issue, index) => {
    for (let i = 0; i < checkedItems.value.length; i++) {
      if (index === checkedItems.value[i]) {
        console.log("change");
        issue.status = (status === "open" ? true : false);
        break;
      }
    }
  });
}

const updateOpenStatus = () => {
  selectStatus.value.style.display = "none";
  closedStatus.value.innerText = "";
  isSelectedOpen.value = true;
}

const updateClosedStatus = () => {
  selectStatus.value.style.display = "none";
  closedStatus.value.innerText = "Closed";
  isSelectedOpen.value = false;
}

const editIssues = () => {
  isClickedEditIssues.value = !isClickedEditIssues.value;
  checkedItems.value = [];
  checkAll.value.checked = false;
}

const makeAllChecked = () => {
  if (checkAll.value.checked) {
    for (let index = 0; index < issuesList.value.length; index++) {
      checkedItems.value.push(index);
    }
  } else {
    checkedItems.value = [];
  }
}

const updateAllIssues = () => {
  if (isSelectedOpen.value) {
    editStatus("open");
  } else {
    editStatus("closed");
  }
  editIssues();
}

//handle search input
const searchInput = ref("");
const searchResults = computed(() => store.getters.searchResults);

const toggleSearch = () => {
  if (searchInput.value.length > 0) {
    store.dispatch("toggle_search_input", { input: searchInput.value });
    issuesStatePresent.value = {
      presentState: "searchResults",
      issues: searchResults
    }
  } else {
    if (openState.value.classList.contains("item-state-clicked")) {
      toggleIssueStateOpen();
    } else if (closedState.value.classList.contains("item-state-clicked")) {
      toggleIssueStateClosed();
    } else {
      toggleIssueStateAll();
    }
  }
}

const clearInput = () => {
  searchInput.value = "";
  toggleSearch();
}


// handle sort dropdown btn
const sortBy = ref(null);
const isAscOrder = ref(true);
onMounted(() => {
  toggleIssueStateOpen();
  orderByTitle();
});

const changeOrderIssues = () => {
  isAscOrder.value = !isAscOrder.value;
  store.dispatch('order_list');
}

const orderByTitle = () => {
  sortBy.value.innerText = "Title";
  store.dispatch("sort_by_title");
}

const orderByCreateDate = () => {
  sortBy.value.innerText = "Created date";
}

const orderByUpdateDate = () => {
  sortBy.value.innerText = "Update date";
}

</script>

<style lang="scss">
.main-page {
  position: relative;
  display: flex;

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

        .filtered-search-input {
          position: relative;

          .clear-input {
            cursor: pointer;
            font-size: 1.275rem;
            position: absolute;
            top: .6rem;
            right: .4rem;
          }
        }

        .search-history {
          width: 9%;
          display: flex;
          align-items: center;
          justify-content: space-between;

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
        width: 20%;

        span {
          margin-right: auto;
        }

        .btn-group {
          width: 100%;

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
          display: flex;
          flex-direction: column;
          gap: .4rem;

          .comments {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: .3rem;

            :first-child {
              margin-right: .5rem;
            }
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


  .issuable-update-sidebar {
    visibility: hidden;
    width: 0%;
    height: 39.5rem;
    padding: .5rem 0rem;
    border-left: 1px solid rgb(225, 225, 225);
    padding-right: 0;
    transition: all 0.5s ease-in-out;

    .btns {
      display: none;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    .status {
      display: none;
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
          cursor: pointer;
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

  .edit {
    visibility: visible;
    width: 30%;
    transition: all 0.5s ease-in-out;
    padding: 0 1rem;
    margin-left: 1rem;

    .btns {
      display: flex;
    }

    .status {
      display: block;
    }
  }
}

@media screen and (max-width:990px) {
  .main-page {
    .issuable-list-container {
      .top-area {
        flex-direction: column-reverse;

        .nav-controls {
          justify-content: flex-start !important;
          margin-top: .5rem;
        }
      }
    }

    .filtered-search-input-container {
      .sort-dropdown-container {
        .dropdown-content {
          top: 2.5rem;
          left: -4.2rem;
        }
      }
    }
  }
}

@media screen and (max-width:767px) {
  .main-page {
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
            }
          }
        }
      }

      .filtered-search-input-container {
        flex-direction: column;

        .issuable-search-container {
          .search-history {
            width: 19%;
          }
        }

        .sort-dropdown-container {
          width: 100%;

          .dropdown-content {
            width: inherit;
            top: -9.2rem;
            left: 0rem;

            li {
              width: inherit;
            }
          }

          .btn-group {
            display: flex;
            justify-content: space-between;
            width: 100%;
          }
        }
      }
    }

    .issues-list {
      .issue {
        .issuable-main-info {
          .issuable-info {
            :nth-child(2) {
              display: none;
            }

            :last-child {
              display: none;
            }
          }
        }

        .issuable-meta {
          visibility: hidden;
        }
      }
    }

    .issuable-update-sidebar {
      width: 50%;
      position: fixed;
      top: 0;
      right: -100%;
      background-color: white;
      z-index: 1;

      .btns {
        margin-top: 5rem;
      }
    }

    .edit {
      right: 0;
    }
  }
}
</style>