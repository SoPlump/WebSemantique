<template>
    <div>
        <div class="width-100 cursor-pointer">
            <h1 class="text-3xl" v-on:click="expand">{{title}}</h1>
        </div>

        <hr class="border-black">
        <div v-for="result in results" v-bind:key="result.uri" v-on:click="redirection(result.uri)" class="w-100 border-2 border-black rounded-lg align-middle flex my-2 p-2 hover:shadow-2xl cursor-pointer">
            {{result.name}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "ResultComponent",
        props: ["resultsAll", "title"],
        data: function() {
            return {
                results:[],
                expanded: true
            }
        },
        mounted(){
            this.results = this.resultsAll
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
                this.expanded ? this.results = this.resultsAll : this.results = this.resultsAll.slice(0, 5);
            }
        },

    }
</script>a