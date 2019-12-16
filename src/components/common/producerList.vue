<template>
    <ul>
        <li v-for="producer in producers" :key="producer.producerName">
            {{ producer.producerName }}
        </li>
    </ul>
</template>

<script>
    export default {
        name: "producerList",
        props: {
            producers: Array,
        }
    }
</script>

<style scoped>

</style>