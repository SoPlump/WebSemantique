<template>
    <ul>
        <li v-for="developer in developers" :key="developer.developerName">
            {{ developer.developerName }}
        </li>
    </ul>
</template>

<script>

    export default {
        name: "developerlist",
        props: {
            developers: Array,
        }
    }
</script>

<style scoped>

</style>