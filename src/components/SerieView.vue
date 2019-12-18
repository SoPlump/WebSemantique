<template>
    <div class="flex flex-col">
        <div class="mb-10 p-4 rounded-lg border-purple-700 border-2">
            <h1 class="text-4xl ">{{name}} </h1>
            <span>First release : {{firstRelease}}</span>
        </div>

        <div class="mb-10">
            <h1 class="text-3xl border-purple-700 border-b-2 mb-3">Abstract</h1>
            <p class="text-justify">{{abstract}}</p>
        </div>

        <div class="mb-10">
            <h1 class="text-3xl border-purple-700 border-b-2 mb-3">Genre</h1>
            <genre-list v-bind:genres=genres></genre-list>
        </div>

        <div class="mb-10">
            <h1 class="text-3xl border-purple-700 border-b-2 mb-3">Editor/Publishers</h1>
            <developerlist v-bind:developers= developers></developerlist>
        </div>

        <div class="mb-10">
            <h1 class="text-3xl border-purple-700 border-b-2 mb-3">Game List</h1>
            <game-list v-bind:games= games></game-list>
        </div>
    </div>
</template>

<script>
    import {getSerieByName} from "../dbpedia-query";
    import GenreList from "./common/genreList";
    import GameList from "./common/gameList";
    import Developerlist from "./common/developerList";

    export default {
        name: "SerieView",
        components: {Developerlist, GameList, GenreList},
        data: function () {
            return {
                serieName: "",
                genres: [],
                developers: [],
                abstract: "",
                firstRelease: "",
                games: [],
                name: "",
            }
        },
        created() {
            this.serieName = this.$route.params.serieName;
            getSerieByName(this.serieName).then(serie=> {

                this.firstRelease = serie.firstReleaseDate;
                this.abstract = serie.abstract;
                this.genres = serie.genres;
                this.developers = serie.developers;
                this.games = serie.games;
                this.name = serie.label;
            })
        }
    }
</script>

<style scoped>

</style>
