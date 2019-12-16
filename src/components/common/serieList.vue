<template>
    <ul>
        <li v-for="serie in series" :key="serie.serieName">
            <customLink :uri=serie.cutUri :name=serie.serieName>

            </customLink>
        </li>
    </ul>
</template>

<script>
    import CustomLink from "./customLink";

    export default {
        name: "serieList",
        components: {CustomLink},
        props: {
            series: Array,
        }
    }
</script>

<style scoped>

</style>