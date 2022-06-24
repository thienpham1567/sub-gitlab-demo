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
        <div class="boards-label">
          <span>Show labels</span>
          <label class="toggle">
            <input type="checkbox" id="toggle-label" checked>
            <span class="toggle-btn"></span>
          </label>
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
            <button @click="insertIssue" class="btn border-light-grey"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
        <div v-if="clickNewIssueBtn" class="issue-input create-issue">
          <label for="">Title</label>
          <input type="text" v-model="title">
          <div class="btns">
            <button @click="createNewIssue" class="issue-btn new-btn border-light-grey">Create issue</button>
            <button @click="cancel" class="btn issue-btn border-light-grey">Cancel</button>
          </div>
        </div>
        <ul class="issues-container" @drop="onDrop($event, true)" @dragenter.prevent @dragover.prevent>
          <li v-for="(issue, index) in store.getters.openIssues" :key="issue.id" draggable="true"
            @dragstart="dragStart($event, issue)">
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
        <ul class="issues-container" @drop="onDrop($event, false)" @dragenter.prevent @dragover.prevent>
          <li v-for="(issue, index) in store.getters.closedIssues" :key="issue.id" draggable="true"
            @dragstart="dragStart($event, issue)">
            <span>{{ issue.title }}</span>
            <span>#{{ index }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ref } from 'vue';
import { uid } from 'uid';

const route = useRoute();
const store = useStore();

const openIssues = computed(() => store.getters.openIssues);
const closedIssues = computed(() => store.getters.closedIssues);

const toggleMenu = () => {
  store.dispatch('toggle_menu');
  console.log("ffff");
}

const dragStart = (event, issue) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData('issueID', issue.id);
}

const onDrop = (event, status) => {
  console.log("Drop");
  const issueID = event.dataTransfer.getData('issueID');
  store.dispatch("change_status_issue", { issueID: issueID, state: status });
}

const title = ref("");
const createNewIssue = () => {
  if (title.value.length === 0) {
    return;
  }
  const newIssue = {
    id: uid(6),
    title: title.value,
    status: true,
  }
  store.dispatch("add_new_issue", newIssue);
  title.value = "";
  cancel();
}

const clickNewIssueBtn = ref(false)
const cancel = () => {
  clickNewIssueBtn.value = false
}

const insertIssue = () => {
  clickNewIssueBtn.value = !clickNewIssueBtn.value;
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
      width: 65%;
      gap: .5rem;

      .development-btn {
        justify-content: space-between;
        width: 23%;
      }

      .new-board-btn {
        width: 17%;
      }

      .search {
        display: flex;
        width: 60%;

        .filtered-search-input {
          border-left: 1px solid grey;
        }
      }
    }

    .half-right-content {
      display: flex;
      align-items: center;
      width: 35%;
      gap: .5rem;

      .boards-label {
        display: flex;
        align-items: center;
        width: 36%;
        height: 100%;
        padding: 0 .3rem;

        span {
          width: 50%;
        }

        .toggle {
          width: 50%;
          height: 1.5rem;
          position: relative;
          display: flex;
          align-items: center;

        }
      }

      .issue-btn {
        width: 32%;
      }
    }

  }
}

.board-list {
  display: flex;
  padding: 1rem;
  gap: 1rem;

  .board {
    display: block;
    width: 30%;
    background-color: rgb(237, 237, 237);
    padding: 0 .5rem;
    border-radius: 5px;

    .inner-board {
      width: 100%;

      .top-area-board {
        height: 4rem;
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
          color: rgb(133, 133, 133);

          .btn {
            width: 2.2rem;
            height: 2.2rem;
            cursor: pointer;

            i {
              color: rgb(109, 109, 109);
              font-size: 1rem;
              text-align: center;
            }
          }
        }
      }

      .issues-container {
        overflow-y: scroll;
        scroll-behavior: smooth;
        width: 100%;
        height: 27rem;
        list-style: none;
        padding-right: .5rem;

        li {
          height: 3.3rem;
          display: flex;
          justify-content: center;
          flex-direction: column;
          padding: 1rem .5rem;
          background-color: white;
          margin-bottom: .5rem;
          border-radius: 5px;
          gap: .2rem;
          cursor: grab;
          font-size: .8rem;

          :first-child {
            font-weight: 600;
          }
        }
      }

      .create-issue {
        background-color: white;
        padding: 1rem;
        margin-bottom: .3rem;
        border-radius: 5px;

        .btns {
          margin-top: .5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .new-btn {
            width: 7rem;
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
        width: 60%;

        .boards-label {
          width: 50%;

          span {
            width: 100%;
          }

          .toggle {
            width: 70%;
          }
        }
      }

    }
  }

  .board-list {
    .board {
      width: 100%;
    }
  }

}

@media screen and (max-width:767px) {
  .bread-crumb {
    width: 100%;
    font-size: .750rem;

    .bars-menu {
      display: inline-block;
    }

    li {
      text-align: center;

    }

    :nth-child(2) {
      padding-left: 1rem;
    }

    li+li::before {
      padding: 0;
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
          width: 32%;
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

        .issue-btn {
          display: block;
          width: 100%;
        }

        .boards-label {
          width: 100%;

          span {
            width: 40%;
          }

          .toggle {
            width: 100%;
          }
        }

      }

    }
  }

  .board-list {

    .board {
      width: 100%;
    }
  }
}
</style>