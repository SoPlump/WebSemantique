<template>
    <div class="w-100 flex justify-center">
        <input type="text" v-model="searchTerms" class="rounded-lg w-3/4 h-1 p-1 px-5 py-6 self-center border-2 border-gray-600 text-2xl" placeholder="Search..." v-on:keyup.enter="search">
    </div>
</template>

<script>
    import {router} from "../main.js"
    export default {
        name: "Searchpage",
        data () {
            return {
                searchTerms: '',
            }
        },
        methods: {
            search: function () {
                alert("Entered : " + this.$data.searchTerms);
                router.push({path: 'search', query:{ searchTerms: this.$data.searchTerms }})
            }
        }
    }
</script>

<style scoped>

</style>
