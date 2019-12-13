<template>
    <div>
        <div id = 'name'> Name : {{name}}</div>
        <div id = 'date'> Release date : {{date}} </div>
        <div id = 'genre'> Genre : {{genre}} </div>
        <div id = 'serie'> Serie :{{serie}} </div>
        <div id = 'abstract'> Abstract :  {{abstract}}</div>
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