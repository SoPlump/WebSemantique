<template>
    <div>

        <div>serie : {{serieName}}</div>
        <span>
            genre :
        </span>
        <genre-list v-bind:genres=genres>

        </genre-list>
        <span>
            editor :
        </span>

        <developerlist v-bind:developers= developers>

        </developerlist>

        <div>
            date 1er jeu : {{firstRelease}}
        </div>
        <div>
            Abstract : {{abstract}}
        </div>

        <span>
            Games :
        </span>

        <game-list v-bind:games= games>

        </game-list>


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
                serieName: String,
                genres: Array,
                developers: Array,
                abstract: String,
                firstRelease: String,
                games: Array,
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


            })
        }
    }
</script>

<style scoped>

</style>