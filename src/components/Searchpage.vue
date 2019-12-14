<template>
    <div class="w-100">
        <div class="w-100 flex justify-center">
            <input type="text" v-model="searchTerms" class="rounded-lg w-3/4 h-1 p-1 px-5 py-6 self-center border-2 border-gray-600 text-2xl" placeholder="Search..." v-on:keyup.enter="searched">
        </div>
        <ResultsPage ref="result" v-if="searchedOnce" search-terms=""></ResultsPage>
    </div>

</template>

<script>
    import ResultsPage from "./ResultsPage";
    export default {
        name: "Searchpage",
        components: {ResultsPage},
        data () {
            return {
                searchTerms: '',
                searchedOnce: false
            }
        },
        methods:{
            searched: function(){
                this.searchedOnce = true;
                this.$refs.result.search();
            }
        }
    }
</script>

<style scoped>

</style>
