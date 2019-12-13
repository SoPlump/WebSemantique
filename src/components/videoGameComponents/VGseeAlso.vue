<template>
    <div>
        <span id = "sameSerie">Games of the same serie : </span>
        <game-list></game-list>

        <span id = "sameDev">Games of the same developper : </span>
        <game-list></game-list>

        <span id = "sameGenre">Games of the same genre : </span>
        <game-list></game-list>

    </div>
</template>

<script>
    import GameList from "../common/gameListe";

    export default {
        name: "VGseeAlso",
        components: {GameList}
    }
</script>

<style scoped>

</style>