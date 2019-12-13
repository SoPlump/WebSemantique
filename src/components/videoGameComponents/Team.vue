<template>
    <div class="flex justify-center p-2">
        <div class="border border-solid border-black w-3/5 text-left p-2 rounded">
            <div id='team' class="bg-blue-300 text-center font-bold text-xl">TEAM</div>
            <div id='dev' class="flex items-stretch">
                <div class="w-1/6 font-bold">Developer</div>
                <div class="w-5/6">{{dev}}</div>
            </div>
            <div id='director' class="flex items-stretch">
                <div class="w-1/6 font-bold">Release date</div>
                <div class="w-5/6">{{director}}</div>
            </div>
            <div id='producer' class="flex items-stretch">
                <div class="w-1/6 font-bold">Producer</div>
                <div class="w-5/6">{{producer}}</div>
            </div>
            <div id='gameArtist' class="flex items-stretch">
                <div class="w-1/6 font-bold">Game Artist</div>
                <div class="w-5/6">{{gameArtist}}</div>
            </div>
        </div>
    </div>
</template>













<script>
    export default {
        name: "Team",
        props: {
            dev: String,
            director: String,
            producer: String,
            gameArtist: String
        }
    }
</script>

<style scoped>

</style>