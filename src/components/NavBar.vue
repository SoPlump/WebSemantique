<template>
    <div class="w-100 bg-purple-400 mb-10 flex items-center justify-between border-b-4 border-purple-800">
        <router-link to="/" class="p-4 rounded-lg text-xl w-1/6 text-black">Accueil</router-link>
        <div class="text-4xl font-bold text-black">{{title}}</div>
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
