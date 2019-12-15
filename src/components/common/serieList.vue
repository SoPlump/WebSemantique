<template>
    <ul>
        <li v-for="serie in series" :key="serie.serieName">
            {{ serie.serieName }}
        </li>
    </ul>
</template>

<script>
    export default {
        name: "serieList",
        props: {
            series: Array,
        }
    }
</script>

<style scoped>

</style>