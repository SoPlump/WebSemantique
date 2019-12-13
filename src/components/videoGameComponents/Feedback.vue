<template>
    <div class="flex justify-center p-2">
        <div class="border border-solid border-black w-3/5 text-left p-2 rounded">
            <div id='feedback' class="bg-blue-300 text-center font-bold text-xl">FEEDBACK</div>
            <div id='award' class="flex items-stretch">
                <div class="w-1/6 font-bold">Award</div>
                <div class="w-5/6">{{award}}</div>
            </div>
            <div id='ign' class="flex items-stretch">
                <div class="w-1/6 font-bold">IGN</div>
                <div class="w-5/6">{{ign}}</div>
            </div>
            <div id='gs' class="flex items-stretch">
                <div class="w-1/6 font-bold">GS</div>
                <div class="w-5/6">{{gs}}</div>
            </div>
            <div id='mc' class="flex items-stretch">
                <div class="w-1/6 font-bold">MC</div>
                <div class="w-5/6">{{mc}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Feedback",
        props: {
            award: String,
            ign: String,
            gs: String,
            mc: String
        }
    }
</script>

<style scoped>

</style>