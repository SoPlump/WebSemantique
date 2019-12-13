<template>
    <ul>
        <li v-for="genre in genres" :key="genre.genreName">
            {{ genre.genreName }}
        </li>
    </ul>
</template>

<script>
    export default {
        name: "genreList",
        props: {
            genres: Array,
        }
    }
</script>

<style scoped>

</style>