<template>
    <div>
        Game : {{gameName}}

        <div>
            <button v-on:click=test>Bouton pour tester la fonction de requête !</button>
        </div>

        <div id="result">

        </div>

        <FactSheet name="ADD NAME" date="ADD DATE" genre= "ADD GENRE" serie="ADD SERIE" abstract="ADD ABSTRACT">

        </FactSheet>

        <Team id = "team" dev = "ADD DEV" director="ADD DIRECTOR" producer="PRODUCER" game-artist="ADD GAME ARTIST">

        </Team>

        <Feedback award="ADD AWARD" ign="ADD IGN" gs="ADD GS" mc="ADD MC">

        </Feedback>

        <VGseeAlso>

        </VGseeAlso>

    </div>
</template>


<script>

    import FactSheet from "./videoGameComponents/FactSheet";
    import Feedback from "./videoGameComponents/Feedback";
    import Team from "./videoGameComponents/Team";
    import VGseeAlso from "./videoGameComponents/VGseeAlso";

    export default {

        name: "VideoGameView",

        components: {
            VGseeAlso,
            Feedback,
            Team,
            FactSheet,

        },

        data: function () {
            return {
                gameName: String,
            }
        },
        created() {
            this.gameName = this.$route.params.gameName;
        },

        methods: {
            test: function () {

                var xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function() {
                    if (this.readyState === 4 && this.status === 200) {

                        document.getElementById("result").innerHTML = this.responseText;
                    }
                };
                xmlHttp.open( "GET", 'http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=select+%3Fdate%0D%0Awhere+%7B%0D%0Adbr%3A'+ this.$data.gameName + '+dbo%3Agenre+%3Fdate%0D%0A%7D&format=text%2Fhtml&CXML_redir_for_subjs=121&CXML_redir_for_hrefs=&timeout=30000&debug=on&run=+Run+Query+'
                    , true );
                xmlHttp.send( null );
                this.updateContent(this.responseText);
            },

            updateContent: function (genre) {
                document.getElementById("genre")
                    .innerText = genre;
            }
        }

    }

</script>
