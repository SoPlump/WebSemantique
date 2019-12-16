<template>
    <div>
        <div id = 'ign'> IGN : {{ign}}</div>
        <div id = 'gs'> GS : {{gs}}</div>
        <div id = 'mc'> MC : {{mc}}</div>
    </div>
</template>

<script>
    export default {
        name: "Feedback",
        props: {
            ign: String,
            gs: String,
            mc: String
        }
    }
</script>

<style scoped>

</style>