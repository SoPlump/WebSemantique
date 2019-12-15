<template>
    <div class="flex w-full flex-col items-center">
        <vue-headful
                :title="'DuckDuckGame - Search results for ' + searchTerms"
        />
        <div class="flex w-4/5 mt-20 mb-10">
            <Searchpage :search-terms="searchTerms"></Searchpage>
            <div v-on:click="trier" class="w-1/6 cursor-pointer flex justify-center items-center">
                <font-awesome-icon :icon="['fas', 'sort-alpha-down']" class="text-2xl m-2"/>
                <span>Trier</span>
            </div>
        </div>

        <div class=" border-1 w-4/5 flex flex-col">

            <ResultComponent v-show="allGames.length !== 0" v-bind:results-all="allGames" ref="games" title="Video games"></ResultComponent>
            <ResultComponent v-show="allGenres.length !== 0" v-bind:results-all="allGenres" ref="genres" title="Genre"></ResultComponent>
            <ResultComponent v-show="allStudios.length !== 0" v-bind:results-all="allStudios" ref="studios" title="Studios"></ResultComponent>
            <ResultComponent v-show="allSeries.length !== 0" v-bind:results-all="allSeries" ref="series" title="Series"></ResultComponent>

            <div v-if="searching" class="text-4xl text-gray-600 mt-10">
                Searching...
            </div>

            <div v-show="noResults" class="text-4xl text-gray-600 mt-10">
                No results
            </div>
        </div>
    </div>
</template>

<script>
    import ResultComponent from "./ResultComponent";
    import {getAllGenresByName} from "../dbpedia-query"
    import {getAllStudiosByName} from "../dbpedia-query"
    import {getAllSeriesByName} from "../dbpedia-query"
    import {getAllGamesByName} from "../game-query"
    import Searchpage from "./Searchpage";

    export default {
        name: "ResultsPage",
        components: {Searchpage, ResultComponent},
        data: function() {
            return {
                allGenres:[],
                allStudios:[],
                allSeries:[],
                allGames:[],
                noResults: false,
                searching: false,
                cpt: 0,
                searchTerms: String,
            }
        },
        mounted() {
            this.searchTerms = this.$route.query.query;
            this.search();
        },
        methods: {
            search: function() {
                this.searching = true;
                this.noResults = false;
                this.cpt = 0;

                this.allGenres=[];
                this.allStudios=[];
                this.allSeries=[];
                this.allGames=[];

                getAllGenresByName(this.searchTerms).then(res => {
                    this.allGenres = res;
                    this.checkSearching();
                });

                getAllStudiosByName(this.searchTerms).then(res => {
                    this.allStudios = res;
                    this.checkSearching();
                });

                getAllSeriesByName(this.searchTerms).then(res => {
                    this.allSeries = res;
                    this.checkSearching();
                });

                getAllGamesByName(this.searchTerms).then(res => {
                    this.allGames = res;
                    this.checkSearching();
                });
            },
            checkSearching: function(){
                this.cpt ++;
                if(this.cpt === 1){
                    this.searching = false;
                }
                else if(this.cpt === 3){
                    if(this.allStudios.length === 0 && this.allGames.length === 0 && this.allGenres.length === 0 && this.allSeries.length === 0){
                        this.noResults = false;
                    }
                }
            },
            trier: function(){
                this.allGames.sort((a, b)=>{return a.name.localeCompare(b.name)});
                this.allStudios.sort((a, b)=>{return a.name.localeCompare(b.name)});
                this.allSeries.sort((a, b)=>{return a.name.localeCompare(b.name)});
                this.allGenres.sort((a, b)=>{return a.name.localeCompare(b.name)});
            }
        }
    }
</script>

<style scoped>

</style>
