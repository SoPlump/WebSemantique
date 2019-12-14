<template>
    <div class="w-100 flex justify-center mt-5">
        <div class="w-4/5 border-1 flex flex-col">
            <ResultComponent v-bind:results-all="allGenres" title="Genre"></ResultComponent>
            <ResultComponent v-bind:results-all="allStudios" title="Studios"></ResultComponent>
            <ResultComponent v-bind:results-all="allSeries" title="Series"></ResultComponent>
        </div>
    </div>
</template>

<script>
    import ResultComponent from "./ResultComponent";
    import {getAllGenresByName} from "../dbpedia-query"
    import {getAllStudiosByName} from "../dbpedia-query"
    import {getAllSeriesByName} from "../dbpedia-query"

    export default {
        name: "ResultsPage",
        components: {ResultComponent},
        props: {searchTerms: String},
        data: function() {
            return {
                allGenres:[],
                allStudios:[],
                allSeries:[]
            }
        },
        methods: {
            search: function() {
                getAllGenresByName(this.searchTerms).then(genre => {
                    this.allGenres = genre;
                });

                getAllStudiosByName(this.searchTerms).then(genre => {
                    this.allStudios = genre;
                });

                getAllSeriesByName(this.searchTerms).then(genre => {
                    this.allSeries = genre;
                });
            },
        }
    }
</script>

<style scoped>

</style>
