<template>
    <div class="w-100 h-100 pt-10 flex flex-col justify-center">
        <div class="w-100 flex justify-center">
            <input type="text" v-model="searchTerms" class="rounded-lg w-3/4 h-1 p-1 px-5 py-6 self-center border-2 border-gray-600 text-2xl" placeholder="Search..." v-on:keyup.enter="searched">
        </div>
    </div>
</template>

<script>
    import {router} from "../main";

    export default {
        name: "Searchpage",
        data () {
            return {
                searchTerms: '',
            }
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
