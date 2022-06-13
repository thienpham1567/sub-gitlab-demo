import { createStore } from 'vuex';

const state = {
  toggleSidebar: false,
  issuesList: [
    {
      title: 'test',
      date: new Date(2022, 6, 10, 16, 20, 0),
    },
    {
      title: 'test1',
      date: new Date(2022, 6, 10, 16, 20, 0),
    },
    {
      title: 'test2',
      date: new Date(2022, 6, 10, 16, 20, 0),
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
