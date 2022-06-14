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
  <div class="new-issue">
    <h1>New Issue</h1>
    <div class="issue-input">
      <label for="">Title (required)</label>
      <input type="text" name="title">
    </div>
    <div class="btns">
      <button class="issue-btn new-btn">Create issue</button>
      <button class="btn issue-btn">Cancel</button>
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
.bread-crumb {
  :nth-child(2) {
    padding-left: 0;
  }
}

.new-issue {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 1px solid rgb(202, 202, 202);

  h1 {
    margin-top: .5rem;
  }

  .issue-input {
    display: flex;
    flex-direction: column;

    label {
      font-weight: 500;
      margin-bottom: .5rem;
    }

    input {
      outline: none;
      border-radius: 5px;
      border: 1px solid grey;
      padding: .3rem .5rem;

      &:focus {
        outline: 2px solid rgb(0, 140, 255);
      }
    }
  }

  .btns {
    .new-btn {
      width: 8rem;
      margin-right: .5rem;
    }
  }
}

@media screen and (max-width:767px) {

  .bread-crumb {
    .bars-menu {
      display: inline-block;
    }

    :nth-child(2) {
      padding-left: 1rem;
    }
  }
}
</style>