<template>
    <ul>
        <li v-for="game in games" :key="game.name">
            <customLink :uri=game.cutUri :name=game.name>

            </customLink>
        </li>
    </ul>
</template>

<script>
    import CustomLink from "./customLink";
    export default {
        name: "gameList",
        components: {CustomLink},
        props: {
            games: Array,
        }
    }
</script>

<style scoped>

</style>