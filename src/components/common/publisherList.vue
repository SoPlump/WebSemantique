<template>
    <ul>
        <li v-for="publisher in publishers" :key="publisher.name">
            {{ publisher.name }}
        </li>
    </ul>
</template>

<script>
    export default {
        name: "publisherList",
        props: {
            publishers: Array,
        }
    }
</script>

<style scoped>

</style>