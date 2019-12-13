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

        <publisher-list v-bind:publishers= editors>

        </publisher-list>

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
    import {getSerieByName} from "../dbpedia-serie-query";
    import GenreList from "./common/genreList";
    import PublisherList from "./common/publisherList";
    import GameList from "./common/gameListe";

    export default {
        name: "SerieView",
        components: {GameList, PublisherList, GenreList},
        data: function () {
            return {
                serieName: String,
                genres: Array,
                editors: Array,
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
                this.editors = serie.publishers;
                this.games = serie.games;


            })
        }
    }
</script>

<style scoped>

</style>