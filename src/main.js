// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import VueLazyload from "vue-lazyload";
import fastclick from "fastclick";

Vue.use(VueLazyload, {
  error: require("../src/assets/images/artist-loading-error.png"),
  loading: require("../src/assets/images/artist-loading.png")
});

Vue.config.productionTip = false;

fastclick.attach(document.body);

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
