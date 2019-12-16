<template>
    <div>
        <span id = "sameSerie"> Games of the same serie : </span>
        <game-list v-bind:games = games_serie>

        </game-list>

        <span id = "sameDev">Games of the same developper : </span>
        <game-list v-bind:games = games_dev>

        </game-list>

        <span id = "sameGenre">Games of the same genre : </span>
        <game-list v-bind:games = games_genre >

        </game-list>

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