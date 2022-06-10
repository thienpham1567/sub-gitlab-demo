import { createStore } from 'vuex';

const state = {
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

const mutations = {};

const actions = {};

const getters = {
  issuesList: (state) => state.issuesList,
  lengthIssuesList: (state) => state.issuesList.length,
};

const store = createStore({
  state,
  mutations,
  actions,
  getters,
});

export default store;
