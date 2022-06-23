import { createStore } from 'vuex';
import { uid } from 'uid';

const state = {
  toggleSidebar: false,
  issuesList: [
    {
      id: uid(6),
      title: 'btest',
      status: true,
    },
    {
      id: uid(6),
      title: 'ztest1',
      status: true,
    },
    {
      id: uid(6),
      title: 'atest2 2',
      status: true,
    },
    {
      id: uid(6),
      title: 'atest2 1',
      status: true,
    },
  ],
  searchResults: [],
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
  },
  ORDER_LIST(state) {
    state.issuesList = state.issuesList.reverse();
  },
  SORT_BY_TITLE(state) {
    state.issuesList.sort((issue1, issue2) =>
      issue1.title.localeCompare(issue2.title),
    );
  },
  TOGGLE_SEARCH_INPUT(state, payload) {
    if (payload.input.length > 0) {
      state.searchResults = state.issuesList.filter((issue) =>
        issue.title.includes(payload.input),
      );
    }
  },
};

const actions = {
  toggle_menu({ commit }) {
    commit('TOGGLE_MENU');
  },
  add_new_issue({ commit }, payload) {
    commit('ADD_NEW_ISSUE', payload);
  },
  change_status_issue({ commit }, payload) {
    commit('CHANGE_STATUS_ISSUE', payload);
  },
  order_list({ commit }) {
    commit('ORDER_LIST');
  },
  sort_by_title({ commit }) {
    commit('SORT_BY_TITLE');
  },
  toggle_search_input({ commit }, payload) {
    commit('TOGGLE_SEARCH_INPUT', payload);
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
  searchResults(state) {
    return state.searchResults;
  },
};

const store = createStore({
  state,
  mutations,
  actions,
  getters,
});

export default store;
