<template>
  <div id="app" class="h-screen">
    <NavBar title="Welcome to DuckDuckGame!" id="navbar"></NavBar>
    <router-view id="content" :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
  import NavBar from "./components/NavBar";

  export default {
    name: 'app',
    components: {
      NavBar,
    },
    mounted(){
      document.title = "DuckDuckGame"
    }
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
    height: 84%;
  }
</style>
