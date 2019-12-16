<template>
    <ul>
        <li v-for="composer in composers" :key="composer.composerName">
            {{ composer.composerName }}
        </li>
    </ul>
</template>

<script>
    export default {
        name: "composerlist",
        props: {
            composers: Array,
        }
    }
</script>

<style scoped>

</style>