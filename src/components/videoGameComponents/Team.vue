<template>
    <div>
        <div class="mb-10">
            <h1 class="text-3xl border-purple-700 border-b-2 mb-3">Developer</h1>
            <developerlist v-bind:developers=developers></developerlist>
        </div>

        <div class="mb-10">
            <h1 class="text-3xl border-purple-700 border-b-2 mb-3">Director</h1>
            <directorlist v-bind:directors= directors></directorlist>
        </div>

        <div class="mb-10">
            <h1 class="text-3xl border-purple-700 border-b-2 mb-3">Producers</h1>
            <producer-list v-bind:producers = producers></producer-list>
        </div>

        <div class="mb-10">
            <h1 class="text-3xl border-purple-700 border-b-2 mb-3">Game Artists</h1>
            <artistlist v-bind:artists= gameArtists></artistlist>
        </div>

        <div class="mb-10">
            <h1 class="text-3xl border-purple-700 border-b-2 mb-3">Game Composers</h1>
            <composerlist v-bind:composers=composers></composerlist>
        </div>
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
