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
    </div>
</template>

<script>
    import Artistlist from "../common/artistList";
    import Developerlist from "../common/developerList";
    import Directorlist from "../common/directorList";
    export default {
        name: "Team",
        components: {Directorlist, Developerlist, Artistlist},
        props: {
            dev: String,
            director: String,
            producer: String,
            gameArtists: Array,
            developers: Array,
            directors: Array,
        }

    }
</script>

<style scoped>

</style>