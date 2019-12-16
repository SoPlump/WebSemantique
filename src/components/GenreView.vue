<template>
    <div class="flex flex-col">
        <div class="mb-10">
            <h1 class="text-4xl p-4 rounded-lg border-black border mb-3">{{name}}</h1>
        </div>

        <div class="mb-10">
            <h1 class="text-3xl border-black border-b mb-3">Abstract</h1>
            <p class="text-justify">{{abstract}}</p>
        </div>

        <div class="mb-10">
            <h1 class="text-3xl border-black border-b mb-3">Game List</h1>
            <game-list v-bind:games=games></game-list>
        </div>
    </div>
</template>

<script>
    import {getGenreByName} from "../dbpedia-query";
    import GameList from "./common/gameList";

    export default {
        name: "GenreView",
        components: {GameList},
        data: function () {
            return {
                genreName: "",
                abstract: "",
                name: "",
                games : [],

            }
        },
        created() {
            this.genreName = this.$route.params.genreName;

            getGenreByName(this.genreName).then(genre => {
                this.abstract = genre.abstract;
                this.games = genre.games;
                this.name = genre.name;
            })
        },
    }
</script>