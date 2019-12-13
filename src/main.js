import Vue from 'vue'
import App from './App.vue'
import "@/assets/css/output.css"
import VueRouter from 'vue-router'
import Welcome from "./components/Welcome";
import ResultsPage from "./components/ResultsPage";
import Pagenotfound from "./components/Pagenotfound";
import Searchpage from "./components/Searchpage";
import VideoGameView from "./components/VideoGameView";

Vue.config.productionTip = false;

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    {path : '/', component: Searchpage},
    {path : '/search', component: ResultsPage},
    {path : '/home', component: Welcome},
    {path : '/game/:gameName',component:VideoGameView},
    {path: '*', component: Pagenotfound}
  ],
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
