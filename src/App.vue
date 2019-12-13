<template>
  <div id="app" class="h-screen">
    <NavBar title="Jeux Vidéo" id="navbar"></NavBar>
    <router-view id="content"></router-view>
  </div>
</template>

<script>
  import NavBar from "./components/NavBar";
  import {getSerieByName} from "./dbpedia-query";
  import {getGameByName} from "./game-query";
  import {getAllGamesByName} from "./game-query";

  export default {
  name: 'app',
  components: {
    NavBar,
  },
  mounted:() =>
    /*eslint-disable*/
    getSerieByName("Final_Fantasy").then(res => console.log(res))
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#navbar{
  height: 8%;
}
#content{
  height: 92%;
}
</style>
