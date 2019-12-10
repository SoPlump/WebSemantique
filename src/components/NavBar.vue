<template>
    <div class="w-100 bg-purple-500 flex items-center justify-between px-10">
        <router-link to="/" class="p-4 rounded-lg">Accueil</router-link>
        <div class="text-2xl font-bold ">{{title}}</div>
        <div><input type="text" class="rounded-lg p-1 px-3" placeholder="Search..."></div>
    </div>
</template>

<script>
    export default {
        name: "NavBar",
        props:{
            title: String
        }
    }
</script>

<style scoped>

</style>
