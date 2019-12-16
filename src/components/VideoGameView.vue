<template>
    <div>

        <div id="result">

        </div>

        <FactSheet :name=gameNameClean :date= releaseDate v-bind:genre= genre v-bind:series=series :abstract=abstract>

        </FactSheet>

        <Team id = "team" v-bind:developers=developers  v-bind:directors=directors producer="PRODUCER" v-bind:gameArtists=artists>

        </Team>

        <Feedback award="ADD AWARD" :ign=ign :gs=gs :mc= mc>

        </Feedback>

        <VGseeAlso v-bind:games_genre=games_genre v-bind:games_dev=games_dev v-bind:games_serie=games_serie>

        </VGseeAlso>

    </div>
</template>


<script>

    import FactSheet from "./videoGameComponents/FactSheet";
    import Feedback from "./videoGameComponents/Feedback";
    import Team from "./videoGameComponents/Team";
    import VGseeAlso from "./videoGameComponents/VGseeAlso";
    import {getGameByName} from "../game-query";

    export default {

        name: "VideoGameView",

        components: {
            VGseeAlso,
            Feedback,
            Team,
            FactSheet,

        },

        data: function () {
            return {
                gameName: "",
                gameNameClean: "",
                series: [],
                genre: [],
                abstract : "",
                releaseDate : "",
                artists: [],
                developers: [],
                directors: [],
                award: "",
                mc : "",
                ign: "",
                gs: "",
                games_serie: [],
                games_dev: [],
                games_genre: [],

            }
        },
        created() {
            this.gameName = this.$route.params.gameName;
            getGameByName(this.gameName).then(game => {
                /*eslint-disable*/
                console.log(game);
                this.gameNameClean = game.name;
                this.series = game.gameSeries;
                this.abstract = game.abstract;
                this.releaseDate = game.releaseDate;
                this.artists = game.gameArtists;
                this.developers = game.gameDevelopers;
                this.directors = game.gameDirectors;
                this.genre = game.gameGenres;
                this.mc = game.gameCritics[0].mcCritic;
                this.ign = game.gameCritics[0].ignCritic;
                this.gs = game.gameCritics[0].gspotCritic;
                this.games_serie = game.otherGamesFromSameSerie;
                this.games_dev = [];
                this.games_genre = [];

            });
        }
    }

</script>
