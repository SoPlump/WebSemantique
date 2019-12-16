<template>
    <ul>
        <li v-for="publisher in publishers" :key="publisher.name">
            <custom-link :uri=publisher.cutUri :name=publisher.name>

            </custom-link>
        </li>
    </ul>
</template>

<script>
    import CustomLink from "./customLink";
    export default {
        name: "publisherList",
        components: {CustomLink},
        props: {
            publishers: Array,
        }
    }
</script>

<style scoped>

</style>