<template>
    <ul>
        <li v-for="serie in series">
            {{ serie }}
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