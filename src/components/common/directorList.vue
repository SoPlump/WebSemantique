<template>
    <ul>
        <li v-for="director in directors" :key="director.directorName">
            {{ director.directorName }}
        </li>
    </ul>
</template>

<script>

    export default {
        name: "directorlist",
        props: {
            directors: Array,
        }
    }
</script>

<style scoped>

</style>