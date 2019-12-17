<template>
    <router-link :to=uri class="align-middle text hover:shadow-xl p-2 rounded-lg hover:bg-purple-200 leading-loose">
        {{name}} <font-awesome-icon :icon="['fas', 'external-link-alt']" class="text-purple-400 text-xs"></font-awesome-icon>
    </router-link>
</template>

<script>

    export default {
        name: "customLink",
        props: {
            uri: String,
            name: String,
        },
        methods: {
        }
    }
</script>

<style scoped>

</style>
