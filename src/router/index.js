import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ListIssuesView from '../views/ListIssuesView.vue';

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
      ],
    },
  ],
});

export default router;
