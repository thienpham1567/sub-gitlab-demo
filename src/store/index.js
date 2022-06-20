import { createStore } from 'vuex';
import { uid } from 'uid';

const state = {
  toggleSidebar: false,
  issuesList: [
    {
      id: uid(6),
      title: 'test',
      status: true,
    },
    {
      id: uid(6),
      title: 'test1',
      status: true,
    },
    {
      id: uid(6),
      title: 'test2',
      status: true,
    },
    {
      id: uid(6),
      title: 'test3',
      status: true,
    },
  ],
};

const mutations = {
  TOGGLE_MENU(state) {
    state.toggleSidebar = !state.toggleSidebar;
  },
  ADD_NEW_ISSUE(state, payload) {
    state.issuesList.push(payload);
  },
  CHANGE_STATUS_ISSUE(state, payload) {
    state.issuesList.forEach((issue) => {
      if (issue.id === payload.issueID) {
        issue.status = payload.state;
      }
    });
    console.log(state.issuesList);
  },
};

const actions = {
  toggle_menu(context) {
    context.commit('TOGGLE_MENU');
  },
};

const getters = {
  toggleSidebar(state) {
    return state.toggleSidebar;
  },
  issuesList(state) {
    return state.issuesList;
  },
  openIssues(state) {
    return state.issuesList.filter((issue) => issue.status === true);
  },
  closedIssues(state) {
    return state.issuesList.filter((issue) => issue.status !== true);
  },
};

const store = createStore({
  state,
  mutations,
  actions,
  getters,
});

export default store;
