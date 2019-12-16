<template>
    <div class="flex flex-col">
        <div class="mb-10">
            <h1 class="text-4xl p-4 rounded-lg border-purple-700 border-2 mb-3">{{name}}</h1>
        </div>

        <div class="mb-10">
            <h1 class="text-3xl border-purple-700 border-b-2 mb-3">Publisher of</h1>
            <game-list v-bind:games=publishedGames></game-list>
        </div>

        <div class="mb-10">
            <h1 class="text-3xl border-purple-700 border-b-2 mb-3">Developer of</h1>
            <game-list v-bind:games=developedGames></game-list>
        </div>
    </div>
</template>

<script>
    import GameList from "./common/gameList";
    import {getStudioByName} from "../dbpedia-query";

    export default {
        name: "StudioView",
        components: {GameList},
        data: function () {
            return {
                studioName: "",
                publishedGames : [],
                developedGames : []
            }
        },
        created() {
            this.studioName = this.$route.params.studioName;
            getStudioByName(this.studioName).then(studio => {
                this.publishedGames = studio.publishedGames;
                this.developedGames = studio.developedGames;
                this.name = studio.name;
            })
        },

    }
</script>

<style scoped>

</style>