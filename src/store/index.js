import { createStore } from 'vuex';

const state = {
  toggleSidebar: false,
  issuesList: [
    {
      title: 'test',
      state: true,
    },
    {
      title: 'test1',
      state: true,
    },
    {
      title: 'test2',
      state: false,
    },
  ],
};

const mutations = {
  TOGGLE_MENU(state) {
    state.toggleSidebar = !state.toggleSidebar;
  },
};

const actions = {
  toggle_menu(context) {
    context.commit('TOGGLE_MENU');
  },
};

const getters = {
  issuesList: (state) => state.issuesList,
  lengthIssuesList: (state) => state.issuesList.length,
  toggleSidebar: (state) => state.toggleSidebar,
};

const store = createStore({
  state,
  mutations,
  actions,
  getters,
});

export default store;
