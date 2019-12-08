<template>
    <div class="w-100 flex justify-center mt-5">
        <div class="w-4/5 border-1 flex flex-col">
            <div class="w-100 border-2 border-black rounded-lg align-middle flex my-2 p-2 hover:shadow-2xl cursor-pointer" v-for="result_object in results" :key="result_object.id">
                <div class="h-full mx-2 w-1/6 flex justify-center align-middle">
                    <img :src="result_object.image" alt="">
                </div>
                <div class="mx-2 flex flex-col">
                    <div class="text-2xl font-extrabold">{{result_object.name}}</div>
                    <div class="text-left">{{result_object.year}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "ResultsPage",
        data: function() {
            return {
                searchTerms:String,
                results
            }
        },
        created() {
            this.searchTerms = this.$route.query.searchTerms;
        },
    }

    const results = [
        {
            id: 1,
            name:"Horizon: zero dawn",
            year:"2018",
            image:"https://media.senscritique.com/media/000017767748/source_big/Horizon_Zero_Dawn.jpg",
            url:""
        },
        {
            id: 2,
            name:"Apex",
            year:"2019",
            image:"https://media.senscritique.com/media/000018355902/source_big/Apex_Legends.jpg",
            url:""
        }
    ];
</script>

<style scoped>

</style>
