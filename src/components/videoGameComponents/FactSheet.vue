<template>
    <div>
        <div id = 'name'> Name : {{name}}</div>
        <div id = 'date'> Release date : {{date}} </div>
        <span> Genres: </span>
        <genre-list v-bind:genres = genre>

        </genre-list>
        <span > Series : </span>
        <serie-list v-bind:series= series>

        </serie-list>
        <div id = 'abstract'> Abstract :  {{abstract}}</div>
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