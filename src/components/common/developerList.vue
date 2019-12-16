<template>
    <ul>
        <li v-for="developer in developers" :key="developer.developerName">
            <custom-link :uri=developer.cutUri :name=developer.developerName>

            </custom-link>
        </li>
    </ul>
</template>

<script>

    import CustomLink from "./customLink";
    export default {
        name: "developerlist",
        components: {CustomLink},
        props: {
            developers: Array,
        }
    }
</script>

<style scoped>

</style>