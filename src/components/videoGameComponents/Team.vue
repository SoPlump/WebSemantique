<template>
    <div>
        <div id = 'dev'> Developer : {{dev}}</div>
        <div id = 'director'> Director : {{director}} </div>
        <div id = 'producer'> Producer :  {{producer}}</div>
        <span> Game Artists :  </span>
        <artistlist v-bind:artists= gameArtists>

        </artistlist>
    </div>
</template>

<script>
    import Artistlist from "../common/artistList";
    export default {
        name: "Team",
        components: {Artistlist},
        props: {
            dev: String,
            director: String,
            producer: String,
            gameArtists: Array,
        }
    }
</script>

<style scoped>

</style>