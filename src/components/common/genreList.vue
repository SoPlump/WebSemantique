<template>
    <ul>
        <li v-for="genre in genres" :key="genre.genreName">
            <custom-link :uri=genre.cutUri :name=genre.genreName>

            </custom-link>
        </li>
    </ul>
</template>

<script>
    import CustomLink from "./customLink";
    export default {
        name: "genreList",
        components: {CustomLink},
        props: {
            genres: Array,
        }
    }
</script>

<style scoped>

</style>