<template>
    <a :href = uri>
        {{name}}
    </a>
</template>

<script>
    export default {
        name: "customLink",
        props: {
            uri: String,
            name: String,
        }
    }
</script>

<style scoped>

</style>