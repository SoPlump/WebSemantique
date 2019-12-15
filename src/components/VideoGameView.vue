<template>
    <div>

        <div id="result">

        </div>

        <FactSheet :name=gameNameClean :date= releaseDate v-bind:genre= genre v-bind:series=series :abstract=abstract>

        </FactSheet>

        <Team id = "team" dev = "ADD DEV" director="ADD DIRECTOR" producer="PRODUCER" v-bind:game-artist=artists>

        </Team>

        <Feedback award="ADD AWARD" ign="ADD IGN" gs="ADD GS" :mc= mc>

        </Feedback>

        <VGseeAlso>

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
                award: "",
                mc : "",

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
                this.genre = game.gameGenres;
                this.mc = game.mcCritic;

            });
        }
    }

</script>
