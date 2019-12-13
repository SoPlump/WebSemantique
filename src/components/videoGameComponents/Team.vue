<template>
    <div>
        <div id = 'dev'> Developer : {{dev}}</div>
        <div id = 'director'> Director : {{director}} </div>
        <div id = 'producer'> Producer :  {{producer}}</div>
        <div id = 'gameArtist'> Game Artist :  {{gameArtist}}</div>
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