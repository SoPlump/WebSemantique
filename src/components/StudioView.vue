<template>
    <div>
        <div>
            Studio : {{studioName}}
        </div>

        <span>Publisher of</span>
        <game-list>

        </game-list>

        <span>Developer of</span>
        <game-list>

        </game-list>


    </div>
</template>

<script>
    import GameList from "./common/gameList";
    export default {
        name: "StudioView",
        components: {GameList},
        data: function () {
            return {
                studioName: String,
            }
        },
        created() {
            this.studioName = this.$route.params.studioName;
        },

    }
</script>

<style scoped>

</style>