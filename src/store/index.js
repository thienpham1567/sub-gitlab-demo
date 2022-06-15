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
      state: true,
    },
    {
      title: 'tes3',
      state: true,
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
  openIssues: (state) =>
    state.issuesList.filter((issue) => issue.state === true),
  closedIssues: (state) =>
    state.issuesList.filter((issue) => issue.state !== true),
};

const store = createStore({
  state,
  mutations,
  actions,
  getters,
});

export default store;
