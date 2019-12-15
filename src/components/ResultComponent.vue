<template>
    <div class="mt-5">
        <div class="width-100 cursor-pointer flex justify-between" v-on:click="expand">
            <div class="flex items-center">
                <font-awesome-icon :icon="['fas', 'caret-up']" class="text-2xl m-2" :class="customRotation" />
                <h1 class="text-3xl">{{title}}</h1>
            </div>
            <div class="w-1/4 pt-4 text-right">{{resultsAll.length}} results</div>
        </div>
        <hr class="border-black">
        <div v-for="result in results" v-bind:key="result.uri" v-on:click="redirection(result.uri)" class="w-100 border-2 border-black rounded-lg align-middle flex my-2 p-2 hover:shadow-xl cursor-pointer">
            {{result.name}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "ResultComponent",
        props: ["title", "resultsAll"],
        data: function() {
            return {
                results:[],
                resultsSmall:[],
                expanded: false,
                customRotation:"defaultRotation"
            }
        },
        watch:{
            resultsAll: {
                immediate: true,
                deep: true,
                handler(){
                    this.expanded = false;
                    this.resultsSmall = this.resultsAll;
                    if(this.resultsAll.length > 5){
                        this.resultsSmall = this.resultsAll.slice(0, 5);
                    }
                    this.results = this.resultsSmall;
                }
            }
        },
        methods: {
            redirection : (e) => {
                var splitted = e.split("/");
                var res = splitted[splitted.length - 1];
                /*eslint-disable no-console*/
                console.log(res)
                //this.router.push();
            },
            expand : function() {
                this.expanded = !this.expanded;
                this.expanded ? this.results = this.resultsAll : this.results = this.resultsSmall;
                this.expanded && this.resultsAll.length > 5 ? this.customRotation = "rotateDown" : this.customRotation = "defaultRotation"
            }
        },

    }
</script>
<style scoped>
    .defaultRotation{
        transform: rotate(90deg);
        transition: transform 0.3s;
    }
    .rotateDown{
        transform: rotate(180deg);
        transition: transform 0.3s;
    }
</style>
