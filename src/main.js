import Vue from 'vue'
import App from './App.vue'
import "@/assets/css/output.css"
import VueRouter from 'vue-router'
import Pagenotfound from "./components/Pagenotfound";
import Searchpage from "./components/Searchpage";
import VideoGameView from "./components/VideoGameView";
import SparqlHttp from "./SparqlHttp";
import SerieView from "./components/SerieView";
import GenreView from "./components/GenreView";
import StudioView from "./components/StudioView";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { faSortAlphaDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ResultsPage from "./components/ResultsPage";

library.add(faCaretUp);
library.add(faSortAlphaDown);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    {path: '/', component: Searchpage},
    {path : '/search',component:ResultsPage},
    {path : '/game/:gameName',component:VideoGameView},
    {path : '/series/:serieName',component:SerieView},
    {path : '/genre/:genreName',component:GenreView},
    {path : '/studio/:studioName',component:StudioView},

    {path: '*', component: Pagenotfound}
  ],
  mode: 'history'
});

export const sparql = new SparqlHttp("http://dbpedia.org/sparql", {
  format: "json"
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
