<template>
    <div>

        <div>serie : {{serieName}}</div>
        <div>
            genre :
        </div>
        <div>
            editor :
        </div>
        <div>
            date 1er jeu :
        </div>
        <div>
            Abstract :
        </div>
        <game-list>

        </game-list>

    </div>
</template>

<script>
    import GameList from "./common/gameList";

    export default {
        name: "SerieView",
        components: {GameList},
        data: function () {
            return {
                serieName: String,
            }
        },
        created() {
            this.serieName = this.$route.params.serieName;
        }
    }
</script>

<style scoped>

</style>