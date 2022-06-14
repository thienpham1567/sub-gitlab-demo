import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ListIssuesView from '../views/ListIssuesView.vue';
import CreateIssuesView from '../views/CreateIssuesView.vue';
import BoardsIssuesView from '../views/BoardsIssuesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/issues-list',
          name: 'issues',
          component: ListIssuesView,
        },
        {
          path: '/create-issues',
          name: 'create-issues',
          component: CreateIssuesView,
        },
        {
          path: '/boards-issues',
          name: 'issue-boards',
          component: BoardsIssuesView,
        },
      ],
    },
  ],
});

export default router;
