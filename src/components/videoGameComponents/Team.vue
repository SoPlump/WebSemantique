<template>
    <div>
        <span id = 'dev'> Developer : </span>
        <developerlist v-bind:developers=developers>

        </developerlist>
        <span id = 'director'> Director :  </span>
        <directorlist v-bind:directors= directors>

        </directorlist>
        <span id = 'producer'> Producers : </span>
        <producer-list v-bind:producers = producers>

        </producer-list>


        <span> Game Artists :  </span>
        <artistlist v-bind:artists= gameArtists>

        </artistlist>

        <span> Game Composers : </span>
        <composerlist v-bind:composers=composers>

        </composerlist>
    </div>
</template>

<script>
    import Artistlist from "../common/artistList";
    import Developerlist from "../common/developerList";
    import Directorlist from "../common/directorList";
    import Composerlist from "../common/composerList";
    import ProducerList from "../common/producerList";

    export default {
        name: "Team",
        components: {ProducerList, Composerlist, Directorlist, Developerlist, Artistlist},
        props: {
            dev: String,
            director: String,
            producers: Array,
            gameArtists: Array,
            developers: Array,
            directors: Array,
            composers: Array,
        }

    }
</script>

<style scoped>

</style>