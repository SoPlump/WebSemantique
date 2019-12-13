<template>
    <div class="flex justify-center p-2">
        <div class="border border-solid border-black w-3/5 text-left p-2 rounded">
            <div id='overview' class="bg-blue-300 text-center font-bold text-xl"> OVERVIEW</div>
                <div id='name' class="flex items-stretch">
                        <div class="w-1/6 font-bold">Complete name</div>
                        <div class="w-5/6">{{name}}</div>
                </div>
            <div id='date' class="flex items-stretch">
                <div class="w-1/6 font-bold">Release date</div>
                <div class="w-5/6">{{date}}</div>
            </div>
            <div id='genre' class="flex items-stretch">
                <div class="w-1/6 font-bold">Genre</div>
                <div class="w-5/6">{{genre}}</div>
            </div>
            <div id='serie' class="flex items-stretch">
                <div class="w-1/6 font-bold">Serie</div>
                <div class="w-5/6">{{serie}}</div>
            </div>
            <div id='abstract' class="flex items-stretch">
                <div class="w-1/6 font-bold">Abstract</div>
                <div class="w-5/6">{{abstract}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FactSheet",
        props: {
            name: String,
            date: String,
            genre: String,
            serie: String,
            abstract: String
        }
    }
</script>

<style scoped>

</style>