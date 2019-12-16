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
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCaretUp, faSortAlphaDown, faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import ResultsPage from "./components/ResultsPage";
import vueHeadful from 'vue-headful';
import $ from "jquery";

library.add(faCaretUp);
library.add(faSortAlphaDown);
library.add(faExternalLinkAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('vue-headful', vueHeadful);

Vue.config.productionTip = false;

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    {path: '/', component: Searchpage},
    {path : '/search',component:ResultsPage},
    {path : '/game/:gameName',component:VideoGameView},
    {path : '/serie/:serieName',component:SerieView},
    {path : '/genre/:genreName',component:GenreView},
    {path : '/studio/:studioName',component:StudioView},

    {path: '*', component: Pagenotfound}
  ],
  mode: 'history'
});

export const sparql = new SparqlHttp("http://dbpedia.org/sparql", {
  format: "json"
});

export const getCoverArt = (game) => {
  return new Promise((resolve, reject) => {
    $.ajax("http://77.131.77.178:54387/api/" + game, {
      success: resolve,
      error: reject
    });
  })
      .catch(error => {
        /*eslint-disable no-console*/
        console.error(error);
      })
};

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
