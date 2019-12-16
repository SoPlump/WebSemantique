<template>
    <div>
        <div class="mb-10">
            <h1 class="text-3xl border-purple-700 border-b-2 mb-3">Games of the same serie</h1>
            <game-list v-bind:games = games_serie></game-list>
        </div>

        <div class="mb-10">
            <h1 class="text-3xl border-purple-700 border-b-2 mb-3">Games of the same developper</h1>
            <game-list v-bind:games = games_dev></game-list>
        </div>

        <div class="mb-10">
            <h1 class="text-3xl border-purple-700 border-b-2 mb-3">Games of the same genre</h1>
            <game-list v-bind:games = games_genre ></game-list>
        </div>
    </div>
</template>

<script>
    import GameList from "../common/gameList";

    export default {
        name: "VGseeAlso",
        components: {GameList},
        props: {
            games_genre: Array,
            games_dev: Array,
            games_serie: Array,
        }
    }
</script>

<style scoped>

</style>
