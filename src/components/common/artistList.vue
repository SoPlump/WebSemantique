<template>
    <ul>
        <li v-for="artist in artists" :key="artist.artistName">
            {{ artist.artistName }}
        </li>
    </ul>
</template>

<script>

    export default {
        name: "artistlist",
        props: {
            artists: Array,
        }
    }
</script>

<style scoped>

</style>