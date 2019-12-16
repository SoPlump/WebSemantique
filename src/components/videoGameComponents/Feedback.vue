<template>
    <div class="mb-10">
        <h1 class="text-3xl border-purple-700 border-b-2 mb-3">Feedback</h1>
        <div id = 'ign'> IGN : {{ign}}/10</div>
        <div id = 'gs'> GS : {{gs}}/10</div>
        <div id = 'mc'> MC : {{mc}}/100</div>
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
