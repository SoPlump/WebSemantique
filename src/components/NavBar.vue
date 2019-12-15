<template>
    <div class="w-100 bg-purple-500 flex items-center justify-between">
        <router-link to="/" class="p-4 rounded-lg text-xl w-1/6">Accueil</router-link>
        <div class="text-4xl font-bold ">{{title}}</div>
        <div class="w-1/6"></div>
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
