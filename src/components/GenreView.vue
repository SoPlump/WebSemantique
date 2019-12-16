<template>
    <div>
        <div>
            Genre : {{genreName}}
        </div>
        <div>
            Abstract : {{abstract}}
        </div>

        <span>Game List</span>
        <game-list v-bind:games=games>

        </game-list>


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
                games : [],

            }
        },
        created() {
            this.genreName = this.$route.params.genreName;
            getGenreByName(this.genreName).then(genre => {
                this.abstract = genre.abstract;
                this.games = genre.games;
                /*eslint-disable*/
                console.log(genre);
            })


        },
    }
</script>

<style scoped>

</style>