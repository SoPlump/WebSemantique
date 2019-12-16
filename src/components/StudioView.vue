<template>
    <div>
        <div>
            Studio : {{studioName}}
        </div>

        <span>Publisher of</span>
        <game-list v-bind:games=publishedGames>

        </game-list>

        <span>Developer of</span>
        <game-list v-bind:games=developedGames>

        </game-list>


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
            })
        },

    }
</script>

<style scoped>

</style>