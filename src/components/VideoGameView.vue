<template>
    <div>

        <div id="result">

        </div>

        <div class="flex mb-10 justify-center">
            <img :src="imgSrc" />
        </div>

        <FactSheet :name=gameNameClean :date= releaseDate v-bind:genre= genre v-bind:series=series :abstract=abstract>

        </FactSheet>

        <Team id = "team" v-bind:developers=developers  v-bind:directors=directors v-bind:producers=producers v-bind:gameArtists=artists v-bind:composers=composers>

        </Team>

        <Feedback :ign=ign :gs=gs :mc= mc>

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
    import { getCoverArt } from "../main";

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
                composers: [],
                developers: [],
                directors: [],
                producers: [],
                award: "",
                mc : "",
                ign: "",
                gs: "",
                games_serie: [],
                games_dev: [],
                games_genre: [],
                imgSrc: ""
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
                this.composers = game.gameComposers;
                this.developers = game.gameDevelopers;
                this.directors = game.gameDirectors;
                this.producers = game.gameProducers;
                this.genre = game.gameGenres;
                this.mc = game.gameCritics[0].mcCritic;
                this.ign = game.gameCritics[0].ignCritic;
                this.gs = game.gameCritics[0].gspotCritic;
                this.games_serie = game.otherGamesFromSameSerie;
                this.games_dev = game.otherGamesFromSameDeveloper;
                this.games_genre = game.otherGamesFromSameGenre;

            });
            getCoverArt(this.gameName).then(imgSrc => {
                this.imgSrc = imgSrc;
            });
        }
    }

</script>
