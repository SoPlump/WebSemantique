import {sparql} from "./main";

export const getGameByName = (name) => {
    return sparql.query(`
        SELECT ?res ?name ?abstract min(?releaseDate) as ?date WHERE {
        \t?res a dbo:VideoGame;
        \t\t\tfoaf:name ?name;
        \t\t\tdbo:abstract ?abstract;
        \t\t\tdbo:releaseDate ?releaseDate.
        
        
        \tFILTER langMatches(lang(?name), 'en')
        \tFILTER langMatches(lang(?abstract), 'en')
        \tFILTER (?res = <http://dbpedia.org/resource/${name}>)
        }
    `)
        .then(res => {
            const game = res.results.bindings[0];
            return new Promise(resolve => resolve({
                res: game.res.value,
                name: game.name.value,
                abstract: game.abstract.value,
                releaseDate: game.date.value
            }));
        })
        .then(game => {
            return sparql
                .query(`
                    SELECT ?artistName WHERE {
                        ?res a dbo:VideoGame.
                        
                        OPTIONAL {?res dbo:gameArtist ?artist.}
                        
                        ?artist rdfs:label ?artistName.

                        FILTER langMatches(lang(?artistName), 'en')
                        filter(?res = <${game.res}>)
                    }
                `)
                .then(res => {
                    const artists = res.results.bindings;
                    return new Promise(resolve => resolve({
                        ...game,
                        gameArtists: artists.map(artists => {
                            return {
                                artistName: artists.artistName.value
                            }
                        })
                    }))
                })
        })
        .then(game => {
            
        })
}