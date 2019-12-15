<template>
    <div class="w-5/6 h-100 flex flex-col justify-center m-auto">
        <vue-headful
                title="DuckDuckGame - Search..."
        />
        <div class="flex justify-center">
            <input type="text" v-model="searchTerms" class="rounded-lg w-full h-1 p-1 px-5 py-6 self-center border-2 border-gray-600 text-2xl" placeholder="Search a game, a studio..." v-on:keyup.enter="searched">
        </div>
    </div>
</template>

<script>
    import {router} from "../main";

    export default {
        name: "Searchpage",
        props:{
            searchTerms:String,
        },

        methods:{
            searched: function(){
                router.push({ path: '/search', query: { query: this.searchTerms } });
            }
        }
    }
</script>

<style scoped>

</style>
