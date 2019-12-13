<template>
    <ul>
        <li v-for="game in games" :key="game.id">
            {{ game }}
        </li>
    </ul>
</template>

<script>
    export default {
        name: "gameList",
        props: {
            games: Array,
        }
    }
</script>

<style scoped>

</style>