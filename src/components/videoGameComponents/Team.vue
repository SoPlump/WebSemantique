<template>
    <div>
        <span id = 'dev'> Developer : </span>
        <developerlist v-bind:developers=developers>

        </developerlist>
        <span id = 'director'> Director :  </span>
        <directorlist v-bind:directors= directors>

        </directorlist>
        <div id = 'producer'> Producer :  {{producer}}</div>
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

    export default {
        name: "Team",
        components: {Composerlist, Directorlist, Developerlist, Artistlist},
        props: {
            dev: String,
            director: String,
            producer: String,
            gameArtists: Array,
            developers: Array,
            directors: Array,
            composers: Array,
        }

    }
</script>

<style scoped>

</style>