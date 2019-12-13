<template>
    <div>
        <div>
            Genre : {{genreName}}
        </div>
        <div>
            Abstract
        </div>

        <span>Serie List</span>
        <serie-list>

        </serie-list>


    </div>
</template>

<script>
    import SerieList from "./common/serieList";
    export default {
        name: "GenreView",
        components: {SerieList},
        data: function () {
            return {
                genreName: String,
            }
        },
        created() {
            this.genreName = this.$route.params.genreName;
        },
    }
</script>

<style scoped>

</style>