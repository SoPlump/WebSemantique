<template>
    <div>
        <div class="mb-10 p-4 rounded-lg border-purple-700 border-2">
            <h1 class="text-4xl ">{{name}} </h1>
            <span>Release date : {{date}}</span>
        </div>

        <div class="mb-10">
            <h1 class="text-3xl border-purple-700 border-b-2 mb-3">Abstract</h1>
            <p class="text-justify">{{abstract}}</p>
        </div>

        <div class="mb-10">
            <h1 class="text-3xl border-purple-700 border-b-2 mb-3">Genres</h1>
            <genre-list v-bind:genres = genre></genre-list>
        </div>

        <div class="mb-10">
            <h1 class="text-3xl border-purple-700 border-b-2 mb-3">Series</h1>
            <serie-list v-bind:series= series> </serie-list>

        </div>
    </div>
</template>

<script>
    import GenreList from "../common/genreList";
    import SerieList from "../common/serieList";

    export default {
        name: "FactSheet",
        components: {SerieList, GenreList},
        props: {
            name: String,
            date: String,
            genre: Array,
            series: Array,
            abstract: String
        }
    }
</script>

<style scoped>

</style>
