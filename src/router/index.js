import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const Recommend = resolve => {
  import("@/pages/recommend/recommend").then(module => {
    resolve(module);
  });
};

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/recommend",
    },
    {
      path: "/recommend",
      component: Recommend,
    },
  ],
});
